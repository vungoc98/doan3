import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Product } from './class-hang-hoa';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-danh-sach-hang-hoa',
  templateUrl: './danh-sach-hang-hoa.component.html',
  styleUrls: ['./danh-sach-hang-hoa.component.css']
})
export class DanhSachHangHoaComponent implements OnInit {
  
  display_products = []; // Chua san pham hien thi tung trang, moi trang hien thi 10 san pham
  products = new Array(); // Chua tat ca cac san pham cua nha phan phoi
  formSearch: FormGroup; // form tim kiem san pham
  selectedType = ""; // tim kiem theo nhom san pham
  product_type = new Array(); // chua cac nhom san pham hien co cua nha phan phoi
  total_page;// tong so trang
  page; // Chi so trang
  display_pages: boolean = false; // Co hien trang hay khong 
  current_page = 1; // Set active cho cac page
  constructor(private http: Http, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() { 
    this.display_products = [];
    this.formSearch = this.fb.group({
      name: '',
      code: ''
    });

    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 

    // Lay danh sach san pham
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
				"assets/images/" + resJson[i].image, resJson[i].product_category_id, resJson[i].create_date,
        resJson[i].update_date); 
  		}

  	});

    // Kiem tra so luong products co du lon de hien thi trang
    if (this.products.length > 10) this.display_pages = true;

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

    // Lay so trang
    this.route.queryParams.subscribe((params: ParamMap) => {
      this.page = params['page'];  
    })

     

    // Kiem tra nguoi dung co bam chon trang khac trang 1 ( tu 2 den ...)
    if (this.page != undefined) {  
      var k = 0;
      for (var i = (this.page - 1) * 10; i < ((this.page * 10) - 1) && i < this.products.length; i++) {
        this.display_products[k] = this.products[i];
        k++;
      }

      // set active cho trang hien tai
      this.current_page = this.page;
    }
    else {
      for (var i = 0; i < 10; i++) {
        this.display_products[i] = this.products[i];
      }
    }
  }

  // Ham xu ly tim kiem san pham
  async onSearch(formSearch) { 
    this.router.navigate(['/hethongsanpham/danhsachsanpham'], {queryParams: {name: formSearch.value.name.trim(), code: formSearch.value.code.trim(), type: this.selectedType}}); 
    await this.display_products.splice(0, this.products.length);
    const url = "http://localhost:3000/searchProduct";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'name': formSearch.value.name.trim(), 'code': formSearch.value.code.trim(), 'product_category_name': this.selectedType });

    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson.length);
        for (var i = 0; i < resJson.length; i++) {

          this.display_products[i] = new Product(resJson[i].id, resJson[i].code, resJson[i].name, 
            resJson[i].price, resJson[i].description,
          "assets/images/" + resJson[i].image, resJson[i].product_category_id, resJson[i].create_date, resJson[i].update_date);
           console.log(this.products[i]);
        } 
    })

    // Kiem tra co hien so trang hay khong
    if (this.display_products.length > 10) {
      this.display_pages = true;
    }
    else this.display_pages = false;
  }

  // Xac dinh so trang chua san pham
  range(products_length: number) {
    var res = []; 
    this.total_page= Math.ceil(products_length/10);
    for (var i = 0; i < this.total_page; i++) {
      res.push(i + 1);
    }
    return res;
  }

  changePage(page) {  
    this.current_page = page;
    this.display_products.splice(0, this.display_products.length);
    if (page == 1) { 
      this.router.navigateByUrl('/hethongsanpham/danhsachsanpham'); 
      for (var i = 0; i < 10; i++) {
        this.display_products[i] = this.products[i];
      } 
    }
    else { 
      this.router.navigate(['/hethongsanpham/danhsachsanpham'], {queryParams: {page: page}}); 
      var k = 0;
      for (var i = (page - 1) * 10; i < ((page * 10) - 1) && i < this.products.length; i++) {
        this.display_products[k] = this.products[i];
        k++;
      }  
    }
  }

}