import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { ProductCategory} from './class-nhom-hang-hoa';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-danh-sach-nhom-hang-hoa',
  templateUrl: './danh-sach-nhom-hang-hoa.component.html',
  styleUrls: ['./danh-sach-nhom-hang-hoa.component.css']
})
export class DanhSachNhomHangHoaComponent implements OnInit {
  
  formCreateGroupProduct: FormGroup;
  product_categorys = new Array(); // chua danh sach nhom san pham
  total_page;// tong so trang
  page; // Chi so trang
  display_pages: boolean = false; // Co hien trang hay khong 
  current_page = 1; // Set active cho cac page
  number = 5;
  display_products = []; // Chua san pham hien thi tung trang, moi trang hien thi number nhom san pham
  constructor(private fb: FormBuilder, private http: Http, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.formCreateGroupProduct = this.fb.group({
      name: '',
      description: '',
    });

    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 
    
    this.product_categorys.splice(0, this.product_categorys.length);
    // Lay danh sach nhom hang hoa
    const url = "http://localhost:3000/getMenuProduct_Category";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    await this.http.get(url, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => { 
        for (var i = 0; i < resJson.length; i++) {
        this.product_categorys[i] = new ProductCategory(resJson[i].id, resJson[i].name, resJson[i].description, resJson[i].create_date, resJson[i].update_date);
      }
    })
    // Kiem tra so luong products co du lon de hien thi trang
    if (this.product_categorys.length > this.number) this.display_pages = true;

    // Lay so trang
    this.route.queryParams.subscribe((params: ParamMap) => {
      this.page = params['page'];  
    })  

    // Kiem tra nguoi dung co bam chon trang khac trang 1 ( tu 2 den ...)
    if (this.page != undefined) {  
      var k = 0;
      for (var i = (this.page - 1) * this.number; i < (this.page * this.number) && i < this.product_categorys.length; i++) {
        this.display_products[k] = this.product_categorys[i];
        k++;
      }

      // set active cho trang hien tai
      this.current_page = this.page;
    }
    else {
      for (var i = 0; i < this.number && i < this.product_categorys.length; i++) {
        this.display_products[i] = this.product_categorys[i];
      }
    } 
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
    this.display_products.splice(0, this.display_products.length);
    if (page == 1) { 
      this.router.navigateByUrl('/hethongsanpham/hethongnhomsanpham'); 
      for (var i = 0; i < this.number; i++) {
        this.display_products[i] = this.product_categorys[i];
      } 
    }
    else { 
      this.router.navigate(['/hethongsanpham/hethongnhomsanpham'], {queryParams: {page: page}}); 
      var k = 0;
      for (var i = (page - 1) * this.number; i < (page * this.number) && i < this.product_categorys.length; i++) {
        this.display_products[k] = this.product_categorys[i];
        k++;
      }  
    }
  }

  // Tao moi nhom hang hoa
  async onSubmit(formCreateGroupProduct) { 
    // Kiem tra co trung ten nhom san pham
    var i;
    for (i = 0; i < this.product_categorys.length; i++) {
      if (this.product_categorys[i].name.trim().toUpperCase() == formCreateGroupProduct.value.name.trim().toUpperCase()) {
        alert("Trùng tên nhóm sản phẩm"); 
        break;
      }
    } 
    if (i == this.product_categorys.length) {
      this.display_products.splice(0, this.display_products.length);
      const url = "http://localhost:3000/createProduct_Category";
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const body = JSON.stringify(formCreateGroupProduct.value);
      await this.http.post(url, body, { headers: headers })
      .toPromise()
      .then(res => res.json())
      .then(resJson => { 
        this.product_categorys = resJson;
      })
      // Kiem tra so luong products co du lon de hien thi trang
      if (this.product_categorys.length > this.number) this.display_pages = true;

      // Lay so trang
      this.route.queryParams.subscribe((params: ParamMap) => {
        this.page = params['page'];  
      })  

      // Kiem tra nguoi dung co bam chon trang khac trang 1 ( tu 2 den ...)
      if (this.page != undefined) {  
        var k = 0;
        for (i = (this.page - 1) * this.number; i < (this.page * this.number) && i < this.product_categorys.length; i++) {
          this.display_products[k] = this.product_categorys[i];
          k++;
        }

        // set active cho trang hien tai
        this.current_page = this.page;
      }
      else {
        for (i = 0; i < this.number && i < this.product_categorys.length; i++) {
          this.display_products[i] = this.product_categorys[i];
        }
      } 
      this.formCreateGroupProduct.setValue({
        name:'',
        description:''
      });
    } 
  } 
}
