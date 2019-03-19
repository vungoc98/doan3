import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Product } from './class-hang-hoa';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-danh-sach-hang-hoa',
  templateUrl: './danh-sach-hang-hoa.component.html',
  styleUrls: ['./danh-sach-hang-hoa.component.css']
})
export class DanhSachHangHoaComponent implements OnInit {
  
  products = new Array();
  formSearch: FormGroup; // form tim kiem san pham
  selectedType = ""; // tim kiem theo nhom san pham
  product_type = new Array(); // chua cac nhom san pham hien co cua nha phan phoi
  constructor(private http: Http, private fb: FormBuilder) { }

  async ngOnInit() { 
    this.formSearch = this.fb.group({
      name: '',
      code: ''
    });
    this.products.splice(0, this.products.length);
  	// url ket noi toi server
  	var url = "http://localhost:3000/getMenuProduct";

  	// headers: dinh dang du lieu gui va nhan
  	var headers = new Headers({ 'Content-Type': 'application/json' });

  	await this.http.get(url, { headers: headers })
  	.toPromise()
  	.then(res => res.json())
  	.then(resJson => {
  		for (var i = 0; i < resJson.length; i++) {
  			this.products[i] = new Product(resJson[i].id, resJson[i].code, resJson[i].name, 
  				resJson[i].price, resJson[i].description,
				"assets/images/" + resJson[i].image, resJson[i].product_category_id);
  		}
  	}) 
      // Lay thong tin nhom san pham
    url = "http://localhost:3000/getProduct_Type";
    
    headers = new Headers({ 'Content-Type': 'application/json' });

    await this.http.get(url, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      for (var i = 0; i < resJson.length; i++) {
        this.product_type[i] = resJson[i].name;
      }
    })
  }

  // Ham xu ly tim kiem san pham
  async onSearch(formSearch) {
    await this.products.splice(0, this.products.length);
    const url = "http://localhost:3000/searchProduct";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'name': formSearch.value.name.trim(), 'code': formSearch.value.code.trim(), 'product_category_name': this.selectedType });

    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson.length);
        for (var i = 0; i < resJson.length; i++) {

          this.products[i] = new Product(resJson[i].id, resJson[i].code, resJson[i].name, 
            resJson[i].price, resJson[i].description,
          "assets/images/" + resJson[i].image, resJson[i].product_category_id);
           console.log(this.products[i]);
        } 
    })
  }

}