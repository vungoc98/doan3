import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
 @Component({
  selector: 'app-tao-moi-san-pham',
  templateUrl: './tao-moi-san-pham.component.html',
  styleUrls: ['./tao-moi-san-pham.component.css']
})
export class TaoMoiSanPhamComponent implements OnInit {
  formCreateProduct: FormGroup; // form chua thong tin san pham moi can tao
  selectedType = ""; // nhom duoc chon trong form
  product_type = new Array(); // chua cac nhom san pham hien co cua nha phan phoi
  formCreateNewContainer: FormGroup;
  image;
  srcimage = '';
  constructor(private fb: FormBuilder, private http: Http, private router: Router, private element: ElementRef) { }

  async ngOnInit() {
    this.formCreateProduct = this.fb.group({
      name: '',
      price: '',
      image: '',
      description: ''
    });

    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 

    // Lay thong tin nhom san pham
    const url = "http://localhost:3000/getProduct_Type";
    
    const headers = new Headers({ 'Content-Type': 'application/json' });

    await this.http.get(url, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      for (var i = 0; i < resJson.length; i++) {
        this.product_type[i] = resJson[i].name;
      }
    })
  }

  // chon anh
  changeImage() {
    alert("vaoday");
    console.log("vao day");
    this.srcimage = this.image.substr(this.image.lastIndexOf("\\") + 1);
  }

  // gui thong tin san pham moi len server
  onSubmit(formCreateProduct) {
    if (this.selectedType == "") {
      alert("Vui lòng chọn nhóm sản phẩm");
    }
    else {
      // Tach image
      var index = formCreateProduct.value.image.lastIndexOf("\\");
      var image = formCreateProduct.value.image.substring(index + 1);
      
      const url = "http://localhost:3000/createProduct";

      const headers = new Headers({ 'Content-Type': 'application/json' });

      const body = JSON.stringify({ 'name': formCreateProduct.value.name, 'price': formCreateProduct.value.price, 
        'product_type': this.selectedType, 'image': formCreateProduct.value.image.substr(formCreateProduct.value.image.lastIndexOf("\\") + 1)
        , 'description': formCreateProduct.value.description });
      console.log(body);

      this.http.post(url, body, { headers: headers })
      .toPromise()
      .then(res => res.text())
      .then(resText => {
        /*
         * Neu thanh cong (resText = 1) chuyen huong den trang danh sach san pham
         * Neu resText = 0 => hien thong bao loi
         */
         if (resText == "1") {
           this.router.navigateByUrl('hethongsanpham/danhsachsanpham');
         }
         else {
           alert("Error");
         }
      })
    }
  }
}
