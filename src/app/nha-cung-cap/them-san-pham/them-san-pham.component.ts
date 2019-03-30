import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-them-san-pham',
  templateUrl: './them-san-pham.component.html',
  styleUrls: ['./them-san-pham.component.css']
})
export class ThemSanPhamComponent implements OnInit {

  formSearch: FormGroup;

  // Danh sach hang hoa hien chua co(hoac da bi xoa) cua nha cung cap
  array_products = new Array();
  array_products_copy = new Array();

  // Nhom san pham => phuc vu qua trinh tim kiem
  product_type = new Set();
  selectedType = ""; // tim kiem theo nhom san pham

  total_page;// tong so trang
  page; // Chi so trang
  display_pages: boolean = false; // Co hien trang hay khong 
  current_page = 1; // Set active cho cac page
  display_products = []; // Chua san pham hien thi tung trang, moi trang hien thi 10 san pham
  amount_products_page = 5; // so luong san pham moi trang
   
  constructor(private fb: FormBuilder, private http: Http, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() { 
  	this.formSearch = this.fb.group({
  		name: '',
  		code: ''
  	});

    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 

    // Lay cac san pham hien chua co (hoac da bi xoa) cua nha cung cap
    const url = "http://localhost:3000/getProductsNotProvider-NCC";
    const headers = new Headers( {'Content-Type': 'application/json' });
    const body = JSON.stringify( {'username': sessionStorage.getItem('username') });
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => { 
      this.array_products = resJson;
      this.array_products_copy = resJson;
    })

    // Lay nhom san pham
    for (var i = 0; i< this.array_products_copy.length; i++) {
      this.product_type.add(this.array_products[i].name_category);
    }

    for (var i = 0; i < this.array_products_copy.length; i++) {
      this.array_products[i].checked = false;
    } 

    // Kiem tra so luong products co du lon de hien thi trang
    if (this.array_products_copy.length > this.amount_products_page) this.display_pages = true;

    // Lay so trang
    this.route.queryParams.subscribe((params: ParamMap) => {
      this.page = params['page'];  
    }) 
    // Kiem tra nguoi dung co bam chon trang khac trang 1 ( tu 2 den ...)
    if (this.page != undefined) {  
      var k = 0;
      for (var i = (this.page - 1) * this.amount_products_page; i < (this.page * this.amount_products_page) && i < this.array_products_copy.length; i++) {
        this.display_products[k] = this.array_products_copy[i];
        k++;
      } 
      // set active cho trang hien tai
      this.current_page = this.page;
    }
    else {
      for (var i = 0; i < this.amount_products_page; i++) {
        this.display_products[i] = this.array_products_copy[i];
      }
    }
  }
  // Xac dinh so trang chua san pham
  range(products_length: number) {
    var res = []; 
    this.total_page= Math.ceil(products_length/this.amount_products_page);
    for (var i = 0; i < this.total_page; i++) {
      res.push(i + 1);
    }
    return res;
  }

  changePage(page) {  
    this.current_page = page;
    this.display_products.splice(0, this.display_products.length); 
    if (page == 1) { 
      this.router.navigateByUrl('/nhacungcap/danhsachsanpham/themsanpham'); 
      for (var i = 0; i < this.amount_products_page; i++) {
        this.display_products[i] = this.array_products_copy[i];
      } 
    }
    else { 
      this.router.navigate(['/nhacungcap/danhsachsanpham/themsanpham'], {queryParams: {page: page}}); 
      var k = 0;
      for (var i = (page - 1) * this.amount_products_page; i < (page * this.amount_products_page) && i < this.array_products_copy.length; i++) {
        this.display_products[k] = this.array_products_copy[i];
        k++;
      }  
    }
  } 

  // Ham xu ly tim kiem san pham
  async onSearch(formSearch) {  
    this.router.navigate(['/nhacungcap/danhsachsanpham/themsanpham'], {queryParams: {name: formSearch.value.name.trim(), code: formSearch.value.code.trim(), type: this.selectedType}}); 
    this.display_products.splice(0, this.display_products.length);  
    const url = "http://localhost:3000/searchProductNotProvider-NCC";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'username': sessionStorage.getItem('username') ,'name': formSearch.value.name.trim(), 'code': formSearch.value.code.trim(), 'product_category_name': this.selectedType });
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      this.array_products_copy = resJson;
      for (var i = 0; i < this.array_products_copy.length; i++) { 
        for (var j = 0; j < this.array_products.length; j++) {
          if (this.array_products[j].id == this.array_products_copy[i].id) {
             this.array_products_copy[i].checked = this.array_products[j].checked;
             this.array_products[j] = this.array_products_copy[i]; // con tro
             //console.log("j = " + j + " checked: " + this.array_products_copy[i].checked + "checked1: " + this.array_products[j].checked);
             break;
          }
        } 
        
        //   console.log("index: " + index);
        // if (index != -1) { 
        //   this.array_products_copy[i].checked = this.array_products[index].checked;
        // }
      }
    })  
    // Kiem tra co hien so trang hay khong
    if (this.array_products_copy.length > this.amount_products_page) {
      this.display_pages = true;
      this.current_page = 1;   
      for (var i = 0; i < this.amount_products_page && i < this.array_products_copy.length ; i++) {
          this.display_products[i] = this.array_products_copy[i];
      }
    }
    else {
      this.display_pages = false;
      this.display_products = this.array_products_copy;
    }
  }

  async insertProduct() {
    const url = "http://localhost:3000/addProviderProducts-NCC";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'username': sessionStorage.getItem('username'), 'array_products': this.array_products});
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      if (resJson == '1') {
        this.router.navigateByUrl('nhacungcap/danhsachsanpham');
      }
      else {
        alert("Error!");
      }
    })  
  }
} 