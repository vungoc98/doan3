import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-danh-sach-san-pham',
  templateUrl: './danh-sach-san-pham.component.html',
  styleUrls: ['./danh-sach-san-pham.component.css']
})
export class DanhSachSanPhamComponent implements OnInit {
  
  formSearch: FormGroup;
  // addProduct: boolean = true;

  // Danh sach hang hoa hien co cua nha cung cap
  array_products = new Array();

  // Nhom san pham => phuc vu qua trinh tim kiem
  product_type = new Set();
  selectedType = ""; // tim kiem theo nhom san pham

  // Danh sach cac san pham chon xoa
  array_deleteProducts = new Array();

  constructor(private fb: FormBuilder, private http: Http, private router: Router) { }

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

    // Lay cac san pham hien co cua nha cung cap
    const url = "http://localhost:3000/getProviderProducts-NCC";
    const headers = new Headers( {'Content-Type': 'application/json' });
    const body = JSON.stringify( {'username': sessionStorage.getItem('username') });
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => { 
      this.array_products = resJson;
    })

    for (var i = 0; i< this.array_products.length; i++) {
      this.product_type.add(this.array_products[i].name_category);
    }

    for (var i = 0; i < this.array_products.length; i++) {
      this.array_products[i].checked = false;
    }

    // // Lay thong tin nhom san pham
    // url = "http://localhost:3000/getProduct_Type";
    
    // headers = new Headers({ 'Content-Type': 'application/json' });

    // await this.http.get(url, { headers: headers })
    // .toPromise()
    // .then(res => res.json())
    // .then(resJson => {
    //   for (var i = 0; i < resJson.length; i++) {
    //     this.product_type[i] = resJson[i].name;
    //   }
    // })
  }

   // Ham xu ly tim kiem san pham
  async onSearch(formSearch) { 
    this.array_products.splice(0, this.array_products.length);
    const url = "http://localhost:3000/searchProduct-NCC";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'username': sessionStorage.getItem('username') ,'name': formSearch.value.name.trim(), 'code': formSearch.value.code.trim(), 'product_category_name': this.selectedType });

    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
       this.array_products = resJson;
    })
  }

  async deleteProducts( ) {
    var ok = confirm("Xóa các sản phẩm đã chọn?")
    if (ok == true) {
      var k = 0; 
      for (var i = 0; i < this.array_products.length; i++) {
        if (this.array_products[i].checked == true) { 
          this.array_deleteProducts[k] = this.array_products[i]; 
          k++;
        }
      }
      if (this.array_deleteProducts.length == 0) {  
        alert("Không có sản phẩm nào được chọn");
      }
      else { 
        this.array_products.splice(0, this.array_products.length);
        const url = "http://localhost:3000/deleteProducts-NCC";
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify({ 'username': sessionStorage.getItem('username') , 'deleteProducts': this.array_deleteProducts});

        await this.http.post(url, body, { headers: headers })
        .toPromise()
        .then(res => res.json())
        .then(resJson => {
           this.array_products = resJson;
        })
      }
    } 
  }  
}
