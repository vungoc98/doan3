import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { ProductCategory} from './class-nhom-hang-hoa';

@Component({
  selector: 'app-danh-sach-nhom-hang-hoa',
  templateUrl: './danh-sach-nhom-hang-hoa.component.html',
  styleUrls: ['./danh-sach-nhom-hang-hoa.component.css']
})
export class DanhSachNhomHangHoaComponent implements OnInit {
  
  formCreateGroupProduct: FormGroup;
  product_categorys = new Array(); // chua danh sach nhom san pham
  constructor(private fb: FormBuilder, private http: Http) { }

  async ngOnInit() {
    this.formCreateGroupProduct = this.fb.group({
      name: '',
      description: '',
    });
    this.product_categorys.splice(0, this.product_categorys.length);
    // Lay danh sach nhom hang hoa
    const url = "http://localhost:3000/getMenuProduct_Category";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    await this.http.get(url, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
        for (var i = 0; i < resJson.length; i++) {
        this.product_categorys[i] = new ProductCategory(resJson[i].id, resJson[i].name, resJson[i].description);
      }
    })
  }

  // Tao moi nhom hang hoa
  async onSubmit(formCreateGroupProduct) { 
    // Kiem tra co trung ten nhom san pham
    var i;
    for (i = 0; i < this.product_categorys.length; i++) {
      if (this.product_categorys[i].name == formCreateGroupProduct.value.name) {
        alert("Trùng tên nhóm sản phẩm");
        break;
      }
    } 
    if (i == this.product_categorys.length) {
      await this.product_categorys.splice(0, this.product_categorys.length);
      const url = "http://localhost:3000/createProduct_Category";
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const body = JSON.stringify(formCreateGroupProduct.value);
      await this.http.post(url, body, { headers: headers })
      .toPromise()
      .then(res => res.json())
      .then(resJson => {
        for (i = 0; i < resJson.length; i++) {
          this.product_categorys[i] = new ProductCategory(resJson[i].id, resJson[i].name, resJson[i].description);
        } 
      })
    } 
  }

}
