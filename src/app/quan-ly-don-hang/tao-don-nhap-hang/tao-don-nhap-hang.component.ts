import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, FormControl, FormArray, FormsModule } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tao-don-nhap-hang',
  templateUrl: './tao-don-nhap-hang.component.html',
  styleUrls: ['./tao-don-nhap-hang.component.css']
})
export class TaoDonNhapHangComponent implements OnInit {

  modalRef: BsModalRef;
  user_id;  // Lay id cua ncc duoc chon
  form: FormGroup;
  formSearch: FormGroup;
  formProviderInfo: FormGroup;
  formCreateOrder: FormGroup;
  providers = new Array(); // Danh sach nha cung cap => Chua ten va loai hang hoa cung cap
  products = new Array(); // danh sach san pham cua nha cung cap  
  imports = new Array(); // danh sach duoc chon de nhap hang
  searchProducts = new Array(); // chua danh sach san pham tim kiem
  total_amount = 0;
  total_price = 0;
  // subjects = [
  //   { id: 100, name: 'order 1', checked: false },
  //   { id: 200, name: 'order 2', checked: false },
  //   { id: 300, name: 'order 3', checked: false },
  //   { id: 400, name: 'order 4', checked: false }
  // ];
  constructor(private router: Router, private modalService: BsModalService, private fb: FormBuilder, private http: Http, private route: Router) { }

  ngOnInit() { 

    // Form tim kiem
  	this.formSearch = this.fb.group({
			name: '',
			code:'',
		});

    // Form chua thong tin nha cung cap
    this.formProviderInfo = this.fb.group({
      name: '',
      code: '',
      address: '',
      mobile: '',
      email:''
    });
    
    // Form tao thong tin don nhap hang
    this.formCreateOrder = this.fb.group({
      total_amount: '',
      total_price: '',
      ngay_tao: '',
      ngay_du_kien: ''
    });

    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 

  }

  // Ham tinh tong tien va tong so luong hang hoa can nhap
  total() {
    this.total_amount = 0;
    this.total_price = 0;
     for (var i = 0; i < this.imports.length; i++) { 
        this.imports[i].prices = parseInt(this.imports[i].price) * this.imports[i].amount;
        this.total_price += this.imports[i].prices;  
        this.total_amount += parseInt(this.imports[i].amount); 
     
    }
  }

  // Truong hop thay doi trong input
  changeListner($event) { 
    this.total();
  }

  // Thong tin cac nha cung cap
  async openModal1(template1: TemplateRef<any>) {
    this.providers.splice(0, this.providers.length);
    // lay danh sach nha cung cap
    var url = "http://localhost:3000/getProvidersInfo";
    var headers = new Headers({ 'Content-Type': 'application/json' });
    await this.http.get(url, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      for (var i = 0; i < resJson.length; i++) {
        this.providers[i] = resJson[i];
      }
    }) 
    this.modalRef = this.modalService.show(template1);
  }

  openModal2(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template2);
  }

  onClick() {

  }

  // Lua chon nha cung cap de nhap hang
  async choosed() { 
    this.imports.splice(0, this.imports.length);
    // Hien thi thong tin cua nha cung cap duoc chon
    for (var i = 0; i < this.providers.length; i++) {
      if (this.providers[i].id == this.user_id) {
        this.formProviderInfo.setValue({
          name: this.providers[i].name,
          code: this.providers[i].code,
          address: this.providers[i].address,
          mobile: this.providers[i].mobile,
          email: this.providers[i].email
        });
        break;
      }
    }

    // this.providers.splice(0, this.providers.length);
    this.products.splice(0, this.products.length);
    // lay danh sach hang hoa cua nha cung cap da chon
    const  url = "http://localhost:3000/getProviderProducts";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'user_id': this.user_id });
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      for (var i = 0; i < resJson.length; i++) {
        this.products[i] = resJson[i];
      }
    })  
    this.total();
    this.modalRef.hide();
  }

  // Dong popup them san pham nhap 
  checkbox() { 
    // Cac phan tu trong mang imports phai duoc giu nguyen => so luong checked = true trong products cung phai giu nguyen
    for (var i = 0; i < this.products.length; i++) {
      for (var j = 0; j < this.imports.length; j++) {
        if (this.imports[j].id == this.products[i].id) { 
          this.products[i].checked = true;
          break;
        }
      }  
      if (j == this.imports.length) {
        this.products[i].checked = false;
      } 
    }    
  	this.modalRef.hide(); 
  }

  // Lua chon san pham can nhap
  insertProduct() { 
    this.imports.splice(0, this.imports.length); 
    let k = 0;
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].checked == true) {
        this.imports[k] = this.products[i];  
        k++; 
      }
      else {
        this.products[i].amount = 0;
        this.products[i].prices = 0;
      }
    }  
    this.total();
    this.modalRef.hide();
  }

  // Tim kiem hang hoa phuc vu qua trinh nhap hang
  async onSearch() {  
    const  url = "http://localhost:3000/searchProviderProducts";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'user_id': this.user_id, 'name': this.formSearch.value.name, 'code': this.formSearch.value.code });
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      for (var i = 0; i < resJson.length; i++) {
        this.searchProducts[i] = resJson[i];
        for (var j = 0; j < this.imports.length; j++) {
          if (this.imports[j].id == this.searchProducts[i].id) {
            this.searchProducts[i].checked = true; 
          }
        }
      }
    }) 

    // De san pham tim kiem len dau 
    for (var i = 0; i < this.searchProducts.length; i++) {
      for (var j = i; j < this.products.length; j++) {
        if(this.products[j].id == this.searchProducts[i].id) { 
          let tmp = this.products[i];
          this.products[i] = this.searchProducts[i];
          this.products[j] = tmp;
          break;
        }
      } 
    }   
	}

  // Lay thong tin don nhap hang va gui len server
  createOrder(formCreateOrder) { 
    // Chuyen du lieu sang dang date trong mysql 
    // Ngay tao don hang => phai la ngay hien tai
    //var dateCreated = new Date();  
    var dateCreated = new Date(formCreateOrder.value.ngay_tao);
    var ngay_tao = (dateCreated.getFullYear()) + "-" + (dateCreated.getMonth() + 1) + "-" + dateCreated.getDate();

    // Ngay du kien giao hang
    var date = new Date(formCreateOrder.value.ngay_du_kien);
    var ngay_du_kien = (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' +  date.getDate(); 
    const url = "http://localhost:3000/createOrder";
    const headers = new Headers( {'Content-Type': 'application/json'});
    const body = JSON.stringify({'user_id': this.user_id, 'price_total': this.total_price, 'order_date': ngay_tao,
      'import_date': ngay_du_kien, 'products': this.imports, 'amount_total': this.total_amount});
    this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      // Them don hang thanh cong
      if (resJson == "1") {
        this.route.navigateByUrl('/quanlydonhang/quanlydonhang');
      }
      else {
        alert("Error!");
      }
    })
  }
}
