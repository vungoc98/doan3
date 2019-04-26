import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-dat-hang',
  templateUrl: './dat-hang.component.html',
  styleUrls: ['./dat-hang.component.css']
})
export class DatHangComponent implements OnInit {

  modalRef: BsModalRef;
  formSearch: FormGroup;
  formCreateOrder: FormGroup; // Form tao don dat hang
  products = new Array(); // danh sach san pham cua nha phan phoi 
  product_type = new Array();// danh sach ten nhom san pham
  selectedType = ''; // nhom san pham duoc chon

  // hien thi trang khi so luong san pham lon
  total_page;// tong so trang
  page; // Chi so trang
  display_pages: boolean = false; // Co hien trang hay khong 
  current_page = 1; // Set active cho cac page
  amount_products_page = 5; // so luong san pham moi trang
  products_copy = new Array();
  display_products = []; // Chua san pham hien thi tung trang, moi trang hien thi 10 san pham

  products_order = new Array(); // Mang chua cac product duoc chon de dat hang
  total_amount = 0;
  total_price = 0;
  constructor(private route: ActivatedRoute, private modalService: BsModalService, private fb: FormBuilder, private router: Router, private http: Http) { }

  async ngOnInit() {
  	this.formSearch = this.fb.group({
  		name: '',
  		code: ''
  	});

    // Form tao thong tin don nhap hang
    this.formCreateOrder = this.fb.group({
      total_amount: '',
      total_price: '',  
    });

    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 

    // lay danh sach hang hoa cua nha phan phoi
    var  url = "http://localhost:3000/getMenuProduct";
    var headers = new Headers({ 'Content-Type': 'application/json' });
    await this.http.get(url, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      this.products = resJson;
      this.products_copy = resJson; 
    })  

    // Them thuoc tinh checked cho moi product => de kiem tra san pham co duoc chon dat hay khong
    for (var i = 0; i < this.products.length; i++) {
      this.products[i].checked = false; 
    }

    // Lay danh sach ten nhom san pham
    url = "http://localhost:3000/getProduct_Type";
    headers = new Headers({ 'Content-Type': 'application/json' });
    await this.http.get(url, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => { 
      this.product_type = resJson;
    })  

    for (var i = 0; i < this.products.length; i++) {
      this.products[i].checked = false;
      this.products[i].amount = 0;
      this.products[i].checkAmount = false;
    } 

    // Kiem tra so luong products co du lon de hien thi trang
    if (this.products_copy.length > this.amount_products_page) this.display_pages = true;

    // Lay so trang
    this.route.queryParams.subscribe((params: ParamMap) => {
      this.page = params['page'];  
    }) 
    // Kiem tra nguoi dung co bam chon trang khac trang 1 ( tu 2 den ...)
    if (this.page != undefined) {  
      var k = 0;
      for (var i = (this.page - 1) * this.amount_products_page; i < (this.page * this.amount_products_page) && i < this.products_copy.length; i++) {
        this.display_products[k] = this.products_copy[i];
        k++;
      } 
      // set active cho trang hien tai
      this.current_page = this.page;
    }
    else {
      for (var i = 0; i < this.amount_products_page && i < this.products_copy.length; i++) {
        this.display_products[i] = this.products_copy[i];
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
      for (var i = 0; i < this.amount_products_page; i++) {
        this.display_products[i] = this.products_copy[i];
      } 
    }
    else { 
      this.router.navigate(['/sieuthi/dathang'], {queryParams: {page: page}}); 
      var k = 0;
      for (var i = (page - 1) * this.amount_products_page; i < (page * this.amount_products_page) && i < this.products_copy.length; i++) {
        this.display_products[k] = this.products_copy[i];
        k++;
      }  
    }
  } 

  // Ham xu ly tim kiem san pham
  async onSearch(formSearch) {  
    this.router.navigate(['/sieuthi/dathang'], {queryParams: {name: formSearch.value.name.trim(), code: formSearch.value.code.trim(), type: this.selectedType}}); 
    this.display_products.splice(0, this.display_products.length);  
    const url = "http://localhost:3000/searchProduct";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({'name': formSearch.value.name.trim(), 'code': formSearch.value.code.trim(), 'product_category_name': this.selectedType.trim() });
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => { 
      this.products_copy = resJson;
      var i, j;
      // Gan trang thai cua phan tu moi = phan tu cu vua tim kiem
      for (i = 0; i < this.products_copy.length; i++) { 
        for (j = 0; j < this.products.length; j++) {
          if (this.products[j].id == this.products_copy[i].id) { 
            this.products_copy[i] = this.products[j]; // con tro 
            break;
          }
        }  
      }

      // Giu nguyen cac san pham da dat 
      for (i = 0; i < this.products.length; i++) {
        for (j = 0; j < this.products_order.length; j++) {
          if (this.products_order[j].id == this.products[i].id) {  
            this.products[i].checked = true;
            break;
          }
        }    
      }    
    })  
    // Kiem tra co hien so trang hay khong
    if (this.products_copy.length > this.amount_products_page) {
      this.display_pages = true;
      this.current_page = 1;   
      for (var i = 0; i < this.amount_products_page && i < this.products_copy.length ; i++) {
          this.display_products[i] = this.products_copy[i];
      }
    }
    else {
      this.display_pages = false;
      this.display_products = this.products_copy;
    }
  }

  // Ham tinh tong tien va tong so luong hang hoa can nhap
  total() {
    this.total_amount = 0;
    this.total_price = 0;
     for (var i = 0; i < this.products_order.length; i++) { 
        this.products_order[i].prices = parseInt(this.products_order[i].price) * this.products_order[i].amount;
        this.total_price += this.products_order[i].prices;  
        this.total_amount += parseInt(this.products_order[i].amount);  
    }
  }

  // Truong hop thay doi trong input
  changeListner($event, id) { 
    var product = this.products_order.find(product => product.id == id);
    product.checkAmount = false;
    this.total();
  }

  onSubmit() {
    
  }

  openModal(template: TemplateRef<any>) {
    this.formSearch.setValue({
      name: '',
      code: ''
    });
    this.onSearch(this.formSearch);
    this.modalRef = this.modalService.show(template);
    const modalWidth =  'modal-lg';
    this.modalRef.setClass(modalWidth); 
  }
 

  // Lua chon san pham can nhap
  insertProduct() {  
    this.products_order.splice(0, this.products_order.length);
    var k = 0;
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].checked == true) {
        this.products_order[k] = this.products[i];
        k++;
      }
      else {
        this.products[i].amount = 0;
        this.products[i].prices = 0;
        this.products[i].checkAmount = false;
      }
    } 
    this.total();
    this.modalRef.hide();
  }

  // Dong popup them san pham nhap 
  checkbox() { 
    var i, j;
     //Cac phan tu trong mang products_order phai duoc giu nguyen => so luong checked = true trong products cung phai giu nguyen
    for (i = 0; i < this.products.length; i++) {
      for (j = 0; j < this.products_order.length; j++) {
        if (this.products_order[j].id == this.products[i].id) { 
          this.products[i].checked = true;
          break;
        }
      }   
      if (j == this.products_order.length) { 
        this.products[i].checked = false;
      }
    }    
    this.modalRef.hide(); 
  }

  // Lay thong tin don nhap hang va gui len server
  createOrder(formCreateOrder) {   
    var i, j = 0;  
    for (i = 0; i < this.products_order.length; i++) {
      if(this.products_order[i].amount == 0) {
        this.products_order[i].checkAmount = true; 
        j++;
      } 
    }
    if (j == 0) {
      const url = "http://localhost:3000/createOrder-SieuThi";
      const headers = new Headers( {'Content-Type': 'application/json'});
      const body = JSON.stringify({'username': sessionStorage.getItem('username'), 'price_total': this.total_price,  
        'products': this.products_order, 'amount_total': this.total_amount});
      this.http.post(url, body, { headers: headers })
      .toPromise()
      .then(res => res.json())
      .then(resJson => {
        // Them don hang thanh cong
        if (resJson == "1") {
          this.router.navigateByUrl('/sieuthi/quanlydonhang');
        }
        else {
          alert("Error!");
        }
      })
    } 
  } 
} 
function amountValidator(formControl: FormControl) { 
  if (formControl.value == 0) {
    return false;
  }
  return true;
}
