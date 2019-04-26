import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-ncc-quan-ly-don-hang',
  templateUrl: './ncc-quan-ly-don-hang.component.html',
  styleUrls: ['./ncc-quan-ly-don-hang.component.css']
})
export class NccQuanLyDonHangComponent implements OnInit {
  
  formSearch: FormGroup;
  orders = new Array();
  order_type = new Set(); // Trang thai don hang
  selectedType = ""; 
  total_page;// tong so trang
  page; // Chi so trang
  display_pages: boolean = false; // Co hien trang hay khong 
  current_page = 1; // Set active cho cac page
  number = 5;
  display_orders = []; // Chua don hang hien thi tung trang, moi trang hien thi number don hang
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: Http, private router: Router) { }

  async ngOnInit() {
  	this.formSearch = this.fb.group({
  		code: ''
  	});

    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 

    // Lay danh sach don hang
    const url = "http://localhost:3000/getOrders-NCC";
    const headers = new Headers( {'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'username': sessionStorage.getItem('username') });
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      if (resJson == '0') alert('Error!');
      else this.orders = resJson;
    })
    for (var i = 0; i < this.orders.length; i++) {
      this.order_type.add(this.orders[i].status);
    }
     // Kiem tra so luong orders co du lon de hien thi trang
    if (this.orders.length > this.number) this.display_pages = true;
    // Lay so trang
    this.route.queryParams.subscribe((params: ParamMap) => {
      this.page = params['page'];  
    }) 

    // Kiem tra nguoi dung co bam chon trang khac trang 1 ( tu 2 den ...)
    if (this.page != undefined) {  
      var k = 0;
      for (var i = (this.page - 1) * this.number; i < (this.page * this.number) && i < this.orders.length; i++) {
        this.display_orders[k] = this.orders[i];
        k++;
      }

      // set active cho trang hien tai
      this.current_page = this.page;
    }
    else {
      for (var i = 0; i < this.number && i < this.orders.length; i++) {
        this.display_orders[i] = this.orders[i];
      }
    }
  }

  // Tim kiem don hang
  async onSearch(formSearch) {
    this.orders.splice(0, this.orders.length);
    const url = "http://localhost:3000/searchOrders-NCC";
    const headers = new Headers( {'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'username': sessionStorage.getItem('username'), 'code': formSearch.value.code.trim(), 'status': this.selectedType });
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      if (resJson == '0') alert('Error!');
      else this.orders = resJson;
    })
     for (var i = 0 ; i < this.number && i < this.orders.length; i++) {
      this.display_orders[i] = this.orders[i]; 
    }
    // kiem tra co hien so trang hay khong
    if (this.orders.length > this.number) {
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
    this.display_orders.splice(0, this.display_orders.length);
    if (page == 1) { 
      this.router.navigateByUrl('/nhacungcap/quanlydonhang'); 
      for (var i = 0; i < this.number; i++) {
        this.display_orders[i] = this.orders[i];
      } 
    }
    else { 
      this.router.navigate(['/nhacungcap/quanlydonhang'], {queryParams: {page: page}}); 
      var k = 0;
      for (var i = (page - 1) * this.number; i < (page * this.number) && i < this.orders.length; i++) {
        this.display_orders[k] = this.orders[i];
        k++;
      }  
    }
  }

}
