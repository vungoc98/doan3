import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-cap-nhat-san-pham',
  templateUrl: './cap-nhat-san-pham.component.html',
  styleUrls: ['../tao-moi-san-pham/tao-moi-san-pham.component.css']
})
export class CapNhatSanPhamComponent implements OnInit {

  formUpdateProduct: FormGroup;
  id; // id cua san pham can cap nhat thong tin
  product_type = new Array(); // chua nhom cac san pham 
  selectedType; // Nhom san pham duoc chon
  image;
  constructor(
  	private fb: FormBuilder,
  	private route: ActivatedRoute,
    private http: Http,
    private router: Router,
    private element: ElementRef
  ) { }

  async ngOnInit() {
    this.formUpdateProduct = this.fb.group({
      name: '',
      price: '', 
      image: '',
      description: ''
    });
  	this.route.paramMap.subscribe((params: ParamMap) =>{
  		this.id = params.get('id');
  	})
    
    // Tim thong tin san pham co id = this.id de gan gia tri cho form
    var url = "http://localhost:3000/getProductInfo";
    var headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'id': this.id });
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      this.formUpdateProduct = this.fb.group({
      name: resJson[0].name,
      price: resJson[0].price, 
      image: '',
      description: resJson[0].description
      });
      this.image = "assets/images/" + resJson[0].image;
      this.selectedType = resJson[0].product_type;
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

  // chon anh
  changeListner(event) {
      var reader = new FileReader();
      var image = this.element.nativeElement.querySelector('.image'); 

      reader.onload = function(e) {
          var src = e.target['result'];
          image.src = src;
      };

      reader.readAsDataURL(event.target.files[0]);
      image.width = 100;
      image.height = 100;
  }

  // Cap nhat thong tin san pham
  onSubmit(formUpdateProduct) {
    // Tach image 
    var index = formUpdateProduct.value.image.lastIndexOf("\\");
    var image = formUpdateProduct.value.image.substring(index + 1);
    const url = "http://localhost:3000/updateProduct";
    const headers = new Headers( { 'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'id': this.id, 'name': formUpdateProduct.value.name, 'price': formUpdateProduct.value.price, 
      'image': image, 'description': formUpdateProduct.value.description, 'product_type': this.selectedType });
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
