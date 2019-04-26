import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-chi-tiet-kho-hang',
  templateUrl: './chi-tiet-kho-hang.component.html',
  styleUrls: ['./chi-tiet-kho-hang.component.css']
})
export class ChiTietKhoHangComponent implements OnInit {
  id: string; // id cua kho hang
  product_id; // id cua san pham trong kho hang can chuyen kho
  formUpdateContainer: FormGroup; // form cap nhat thong tin kho hang trong thong tin co ban
  formSearchProduct: FormGroup; // Form tim kiem san pham trong tinh trang kho hang
  modalRef: BsModalRef; // Mo popup
  statusContainer = new Array(); // Chua thong tin cac san pham co trong kho hang id
  container_des = new Array(); // Chua cac kho hang co id khac this.id
  formMoveProduct: FormGroup; // form chua thong tin hang hoa can chuyen
  container_to = ""; // kho can chuyen den
  code_Product; // ma san pham can chuyen kho
  amount = "0"; // so luong ban dau cua san pham
  user_id; // id cua provider chua san pham can chuyen
  containers = new Array(); // Mang chua thong tin lich su kho hang co id = this.id

  // Thong ke kho hang
  amount_from; // so luong chuyen den kho
  amount_order; // so luong chuyen di cho don dat hang
  amount_to; // so luong chuyen kho (chuyen cho kho khac)
  amount_rest; // so luong con lai trong kho
  products = new Array(); // mang cac san pham con lai trong kho
  constructor(private http: Http, private modalService: BsModalService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }

  async ngOnInit() { 
    this.formSearchProduct = this.fb.group({
      name: '',
      code: '',
    });
    this.formUpdateContainer = this.fb.group({
          name:  '',
          code: '',
          address: '',
          mobile: '',
        }); 
  	this.route.paramMap.subscribe((params: ParamMap) => {
  		this.id = params.get('id');
  	}); 
    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 

    // Lay thong tin kho hang co id = this.id
    var url = "http://localhost:3000/getContainerInfo";
    var headers = new Headers({ 'Content-Type': 'application/json' });
    var body = JSON.stringify({'id': this.id});
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
        this.formUpdateContainer.setValue({
          name: resJson[0].name,
          code: resJson[0].code,
          address: resJson[0].address,
          mobile: resJson[0].mobile,
        });
    })
    // Lay id cua cac kho hang khac
    url = "http://localhost:3000/getAnotherIdContainer";
    headers = new Headers({ 'Content-Type': 'application/json' });
    body = JSON.stringify({ 'id': this.id });
    this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      for (var i = 0; i < resJson.length; i++) {
        this.container_des[i] = resJson[i].id;
      }
    })
 
  }


  async chiTietKhoHang(tab: string) {
    // tinh trang kho hang
    if (tab == "tinhtrangkhohang") {
      this.statusContainer.splice(0, this.statusContainer.length);
      // Tinh trang kho hang co id = this.id
      const url = "http://localhost:3000/statusContainer";
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const body = JSON.stringify({'id': this.id});
      await this.http.post(url, body, { headers: headers })
      .toPromise()
      .then(res => res.json())
      .then(resJson => {
        for(var i = 0; i < resJson.length; i++) {
          this.statusContainer[i] = resJson[i]; 
        }
      })
      this.formSearchProduct.setValue({
        name: '',
        code: ''
      })
    }

    // lich su kho hang
    else if (tab == "lichsukhohang") {
      this.containers.splice(0, this.containers.length);
      const url = "http://localhost:3000/getContainerLog";
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const body = JSON.stringify({ 'id': this.id });
      await this.http.post(url, body, { headers: headers })
      .toPromise()
      .then(res => res.json())
      .then(resJson => {
        for (var i = 0; i < resJson.length; i++) {
          this.containers[i] = resJson[i]; 
        }
      })
      this.formSearchProduct.setValue({
        name: '',
        code: ''
      })
    }

    // thong ke kho hang
    else if (tab == "thongkekhohang") {
      this.products.splice(0, this.products.length);
      const url = "http://localhost:3000/thongKeKhoHang";
      const headers = new Headers( {'Content-Type': 'application/json' });
      const body = JSON.stringify( {'id': this.id }); // Truyen cho server id cua kho hang can thong ke
      this.http.post(url, body, { headers: headers })
      .toPromise()
      .then(res => res.json())
      .then(resJson => {
        this.amount_from = resJson.amount_from; 
        this.amount_order = resJson.amount_order;
        this.amount_to = resJson.amount_to;
        this.amount_rest = resJson.amount_rest;
        this.products = resJson.products; 
        if (this.amount_order < 0) this.amount_order = 0;  
      }) 
    }
  }

// cap nhat thong tin kho hang
  async onSubmitUpdate(formUpdateContainer) {
    const url = "http://localhost:3000/updateContainerInfo";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({'id': this.id, 'address': formUpdateContainer.value.address, 'mobile': formUpdateContainer.value.mobile});
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
       // tra ve 1: cap nhat thanh cong, 0: that bai
       if (resJson == "1") {
         alert("Cập nhật thông tin thành công");
       }
       else {
         alert("Error");
       }
    })
  }

  // Tim kiem san pham trong tab: Tinh trang kho hang
  async onSubmitTinhTrangKhoHang(formSearchProduct) {
    this.statusContainer.splice(0, this.statusContainer.length);
    const url = "http://localhost:3000/searchProductStatusContainer";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({'id': this.id, 'name': formSearchProduct.value.name, 'code': formSearchProduct.value.code});
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      for(var i = 0; i < resJson.length; i++) {
        this.statusContainer[i] = resJson[i];
   
      }
    })
  }

  // Tim kiem san pham trong tab: Lich su kho hang
  async onSubmitLichSuKhoHang(formSearchProduct) {
    this.containers.splice(0, this.containers.length);
    this.statusContainer.splice(0, this.statusContainer.length);
    const url = "http://localhost:3000/searchProductContainerLog";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({'id': this.id, 'name': formSearchProduct.value.name , 'code': formSearchProduct.value.code});
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      for(var i = 0; i < resJson.length; i++) {
        this.containers[i] = resJson[i];
      }
    })
  }

  // Chuyen san pham sang kho khac
  openModal(template: TemplateRef<any>, id_Product) {
    this.modalRef = this.modalService.show(template);

    // Khoi tao form
    for (var i = 0; i < this.statusContainer.length; i++) {
      if (this.statusContainer[i].id == id_Product)
      {
        this.container_to = "";
        this.amount = this.statusContainer[i].amount;
        this.product_id = this.statusContainer[i].id;
        this.user_id = this.statusContainer[i].user_id; 
        this.formMoveProduct = this.fb.group({
          code: this.statusContainer[i].code,
          name: this.statusContainer[i].name,
          amount: this.statusContainer[i].amount,
          manufacturing_date: this.statusContainer[i].manufacturing_date,
          expiry_date: this.statusContainer[i].expiry_date,
          container_from: this.id,
        });
        break;
      }
    } 

  }

  moveProduct(formMoveProduct) {
    console.log("user_id: " + this.user_id);
    // Kiem tra da chon kho dich chua
    if (this.container_to == "") {
      alert("Mời bạn chọn kho đích.");
    }
    // Kiem tra so luong chuyen co hop ly
    else if (formMoveProduct.value.amount > this.amount) {
      alert("Số lượng chuyển phải nhỏ hơn " + this.amount);
    }
    else { 
      // Gui thong tin len server
      const url = "http://localhost:3000/moveProductInfo";
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const body = JSON.stringify({ 'container_from': this.id, 'product_id': this.product_id, 'manufacturing_date': formMoveProduct.value.manufacturing_date.split("-").reverse().join("-"), 
        'expiry_date': formMoveProduct.value.expiry_date.split("-").reverse().join("-"), 'amount_before': this.amount, 'amount': formMoveProduct.value.amount, 'container_to': this.container_to, 'user_id': this.user_id });
      this.http.post(url, body, { headers: headers })
      .toPromise()
      .then(res => res.json())
      .then(resJson => {
        if (resJson == "1") {
          this.modalRef.hide();
          for (var i = 0; i < this.statusContainer.length; i++) {
            if (this.statusContainer[i].id == this.product_id) {
              this.statusContainer[i].amount = (parseInt(this.amount) - parseInt(formMoveProduct.value.amount));
            }
          } 
        }
        else {
          alert("Error!");
        }
      }) 
    }
  }
}
