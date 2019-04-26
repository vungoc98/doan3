import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-danh-sach-kho-hang',
  templateUrl: './danh-sach-kho-hang.component.html',
  styleUrls: ['./danh-sach-kho-hang.component.css']
})
export class DanhSachKhoHangComponent implements OnInit {
  
  formSearchContainer: FormGroup;
  containers = new Array(); // mang chua danh sach kho hang
  total_page;// tong so trang
  page; // Chi so trang
  display_pages: boolean = false; // Co hien trang hay khong 
  current_page = 1; // Set active cho cac page
  number = 5;
  display_containers = []; // Chua kho hang hien thi tung trang, moi trang hien thi number kho hang
  constructor(private http: Http, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
  	this.containers.splice(0, this.containers.length);
  	this.formSearchContainer = this.fb.group({
  		name:'',
  		code:''
  	});

    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 

    // Lay danh sach kho hang
  	const url = "http://localhost:3000/getMenuContainer";
  	const headers = new Headers({ 'Content-Type': 'application/json' });
  	await this.http.get(url, { headers: headers })
  	.toPromise()
  	.then(res => res.json())
  	.then(resJson => {
  		for(var i = 0; i < resJson.length; i++) {
  			this.containers[i] = resJson[i];
  		}
  	})

    // Kiem tra so luong products co du lon de hien thi trang
    if (this.containers.length > this.number) this.display_pages = true;
    // Lay so trang
    this.route.queryParams.subscribe((params: ParamMap) => {
      this.page = params['page'];  
    }) 

    // Kiem tra nguoi dung co bam chon trang khac trang 1 ( tu 2 den ...)
    if (this.page != undefined) {  
      var k = 0;
      for (var i = (this.page - 1) * this.number; i < (this.page * this.number) && i < this.containers.length; i++) {
        this.display_containers[k] = this.containers[i];
        k++;
      }

      // set active cho trang hien tai
      this.current_page = this.page;
    }
    else {
      for (var i = 0; i < this.number && i < this.containers.length; i++) {
        this.display_containers[i] = this.containers[i];
      }
    }
  }

  // Tim kiem kho hang
  async searchContainer(formSearchContainer) {
    this.router.navigate(['/hethongkhohang/danhsachkhohang'], {queryParams: {name: formSearchContainer.value.name.trim(), code: formSearchContainer.value.code.trim()}}); 
    this.display_containers.splice(0, this.display_containers.length); 
    const url = "http://localhost:3000/searchContainer";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(formSearchContainer.value);
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      this.containers = resJson; 
    })
    for (var i = 0; i < this.number && i < this.containers.length; i++) {
      this.display_containers[i] = this.containers[i];
    }
    // Kiem tra co hien so trang hay khong
    if (this.containers.length > this.number) {
      this.display_pages = true;
      this.current_page = 1;
    }
    else this.display_pages = false; 
  }

  // Xac dinh so trang chua san pham
  range(products_length: number) {
    var res = []; 
    this.total_page= Math.ceil(products_length/this.number);
    for (var i = 0; i < this.total_page; i++) {
      res.push(i + 1);
    }
    return res;
  }

  changePage(page) {  
    this.current_page = page;
    this.display_containers.splice(0, this.display_containers.length);
    if (page == 1) { 
      this.router.navigateByUrl('/hethongkhohang/danhsachkhohang'); 
      for (var i = 0; i < this.number; i++) {
        this.display_containers[i] = this.containers[i];
      } 
    }
    else { 
      this.router.navigate(['/hethongkhohang/danhsachkhohang'], {queryParams: {page: page}}); 
      var k = 0;
      for (var i = (page - 1) * this.number; i < (page * this.number) && i < this.containers.length; i++) {
        this.display_containers[k] = this.containers[i];
        k++;
      }  
    }
  }

}
