import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, FormControl, FormArray, FormsModule } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-tao-don-nhap-hang',
  templateUrl: './tao-don-nhap-hang.component.html',
  styleUrls: ['./tao-don-nhap-hang.component.css']
})
export class TaoDonNhapHangComponent implements OnInit {

  modalRef: BsModalRef;
  user_id = "";  // Lay id cua ncc duoc chon
  form: FormGroup;
  formSearch: FormGroup;
  formProviderInfo: FormGroup;
  formCreateOrder: FormGroup;
  providers = new Array(); // Danh sach nha cung cap => Chua ten va loai hang hoa cung cap
  products = new Array(); // danh sach san pham cua nha cung cap   
  total_amount = 0;
  total_price = 0; 
  total_page_provider;// tong so trang
  page_provider; // Chi so trang
  display_pages_provider: boolean = false; // Co hien trang hay khong 
  current_page_provider = 1; // Set active cho cac page
  number_provider = 5;
  display_providers = []; // Chua san pham hien thi tung trang, moi trang hien thi number provider
  amount_products_page_provider = 5; // so luong san pham moi trang 

  // hien thi trang khi so luong san pham lon
  total_page_product;// tong so trang
  page_product; // Chi so trang
  display_pages_product: boolean = false; // Co hien trang hay khong 
  current_page_product = 1; // Set active cho cac page
  amount_products_page_product = 5; // so luong san pham moi trang
  products_copy = new Array();
  display_products = []; // Chua san pham hien thi tung trang, moi trang hien thi 10 san pham
  products_order = new Array(); // Mang chua cac product duoc chon de dat hang
  constructor(private route: ActivatedRoute, private router: Router, private modalService: BsModalService, private fb: FormBuilder, private http: Http) { }

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

  // // Ham tinh tong tien va tong so luong hang hoa can nhap
  // total() {
  //   this.total_amount = 0;
  //   this.total_price = 0;
  //    for (var i = 0; i < this.imports.length; i++) { 
  //       this.imports[i].prices = parseInt(this.imports[i].price) * this.imports[i].amount;
  //       this.total_price += this.imports[i].prices;  
  //       this.total_amount += parseInt(this.imports[i].amount); 
     
  //   }
  // }
   // Ham tinh tong tien va tong so luong hang hoa can nhap
  total() {
    this.total_amount = 0;
    this.total_price = 0;
     for (var i = 0; i < this.products_order.length; i++) {  
        this.total_price += parseInt(this.products_order[i].prices);  
        this.total_amount += parseInt(this.products_order[i].amount);  
    }
  }

  // Truong hop thay doi trong input amount
  changeListner($event, id) {  
    var product = this.products_order.find(product => product.id == id);
    product.checkAmount = false;
    this.total();
  }
  // Truong hop thay doi trong input price
  changeListner1($event, id) {  
    var product = this.products_order.find(product => product.id == id);
    product.checkPrices = false;
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
      if (this.user_id == "") {
        this.user_id = resJson[0].id;
      }
    }) 

    // Kiem tra so luong provider co du lon de hien thi trang
    if (this.providers.length > this.number_provider) this.display_pages_provider = true;
    // Lay so trang
    this.route.queryParams.subscribe((params: ParamMap) => {
      this.page_provider = params['page'];  
    }) 

    // Kiem tra nguoi dung co bam chon trang khac trang 1 ( tu 2 den ...)
    if (this.page_provider != undefined) {   
      var k = 0;
      for (var i = (this.page_provider - 1) * this.number_provider; i < (this.page_provider * this.number_provider) && i < this.providers.length; i++) {
        this.display_providers[k] = this.providers[i];
        k++; 
      }

      // set active cho trang hien tai
      this.current_page_provider = this.page_provider;
    }
    else {
      for (var i = 0; i < this.number_provider && i < this.providers.length; i++) {
        this.display_providers[i] = this.providers[i];
      }
    }
    this.modalRef = this.modalService.show(template1);
  }

  // Xac dinh so trang chua nha cung cap
  range(products_length: number) {
    var res = []; 
    this.total_page_provider= Math.ceil(products_length/this.number_provider);
    for (var i = 0; i < this.total_page_provider; i++) {
      res.push(i + 1);
    }
    return res;
  }

  changePage(page) {  
    this.current_page_provider = page;
    this.display_providers.splice(0, this.display_providers.length);
    if (page == 1) {  
      for (var i = 0; i < this.number_provider; i++) {
        this.router.navigate(['/quanlydonhang/taodonnhaphang']);
        this.display_providers[i] = this.providers[i];
      } 
    }
    else { 
      this.router.navigate(['/quanlydonhang/taodonnhaphang'], {queryParams: {page: page}}); 
      var k = 0;
      for (var i = (page - 1) * this.number_provider; i < (page * this.number_provider) && i < this.providers.length; i++) {
        this.display_providers[k] = this.providers[i];
        k++;
      }  
    }
  }

  openModal2(template2: TemplateRef<any>) { 
    this.formSearch.setValue({
      name: '',
      code: ''
    });
    this.onSearch();
    this.modalRef = this.modalService.show(template2);
    const modalWidth =  'modal-lg';
    this.modalRef.setClass(modalWidth);
  }

  onClick() {

  }

  // Lua chon nha cung cap de nhap hang
  async choosed() { 
    this.products_order.splice(0, this.products_order.length);
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
        this.products[i].checked = false; 
        this.products_copy[i] = resJson[i];
      } 
    })   
    for (var i = 0; i < this.products.length; i++) {
      this.products[i].checked = false;
      this.products[i].amount = 0;
    } 
     // Kiem tra so luong products co du lon de hien thi trang
    if (this.products_copy.length > this.amount_products_page_product) this.display_pages_product = true;

    // Lay so trang
    this.route.queryParams.subscribe((params: ParamMap) => {
      this.page_product = params['page'];  
    })  
    for (var i = 0; i < this.amount_products_page_product && i < this.products_copy.length; i++) {
      this.display_products[i] = this.products_copy[i];
    } 
    this.total();
    this.modalRef.hide();
  }
  // Xac dinh so trang chua san pham
  range1(products_length: number) {
    var res = []; 
    this.total_page_product= Math.ceil(products_length/this.amount_products_page_product);
    for (var i = 0; i < this.total_page_product; i++) {
      res.push(i + 1);
    }
    return res;
  }

  changePage1(page) {  
    this.current_page_product = page;
    this.display_products.splice(0, this.display_products.length); 
    if (page == 1) {   
      this.router.navigate(['/quanlydonhang/taodonnhaphang']);
      for (var i = 0; i < this.amount_products_page_product; i++) {
        this.display_products[i] = this.products_copy[i];
      } 
    }
    else { 
      this.router.navigate(['/quanlydonhang/taodonnhaphang'], {queryParams: {page: page}}); 
      var k = 0;
      for (var i = (page - 1) * this.amount_products_page_product; i < (page * this.amount_products_page_product) && i < this.products_copy.length; i++) {
        this.display_products[k] = this.products_copy[i];
        k++;
      }  
    }
  } 
  // // Dong popup them san pham nhap 
  // checkbox() { 
  //   // Cac phan tu trong mang imports phai duoc giu nguyen => so luong checked = true trong products cung phai giu nguyen
  //   for (var i = 0; i < this.products.length; i++) {
  //     for (var j = 0; j < this.imports.length; j++) {
  //       if (this.imports[j].id == this.products[i].id) { 
  //         this.products[i].checked = true;
  //         break;
  //       }
  //     }  
  //     if (j == this.imports.length) {
  //       this.products[i].checked = false;
  //     } 
  //   }    
  // 	this.modalRef.hide(); 
  // }

  // // Lua chon san pham can nhap
  // insertProduct() { 
  //   this.imports.splice(0, this.imports.length); 
  //   let k = 0;
  //   for (var i = 0; i < this.products.length; i++) {
  //     if (this.products[i].checked == true) {
  //       this.imports[k] = this.products[i];  
  //       k++; 
  //     }
  //     else {
  //       this.products[i].amount = 0;
  //       this.products[i].prices = 0;
  //     }
  //   }  
  //   this.total();
  //   this.modalRef.hide();
  // }
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
        this.products[i].checkPrices = false;
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

  // Tim kiem hang hoa phuc vu qua trinh nhap hang
  async onSearch() {  
    const  url = "http://localhost:3000/searchProviderProducts";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'user_id': this.user_id, 'name': this.formSearch.value.name, 'code': this.formSearch.value.code });
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      // for (var i = 0; i < resJson.length; i++) {
      //   this.searchProducts[i] = resJson[i];
      //   for (var j = 0; j < this.imports.length; j++) {
      //     if (this.imports[j].id == this.searchProducts[i].id) {
      //       this.searchProducts[i].checked = true; 
      //     }
      //   }
      // } 
      this.products_copy = resJson;
        var i, j;
        // Gan trang thai cua phan tu cu = phan tu moi vua tim kiem
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

    // // De san pham tim kiem len dau 
    // for (var i = 0; i < this.searchProducts.length; i++) {
    //   for (var j = i; j < this.products.length; j++) {
    //     if(this.products[j].id == this.searchProducts[i].id) { 
    //       let tmp = this.products[i];
    //       this.products[i] = this.searchProducts[i];
    //       this.products[j] = tmp;
    //       break;
    //     }
    //   } 
    // }   
    // Kiem tra co hien so trang hay khong
    if (this.products_copy.length > this.amount_products_page_product) {
      this.display_pages_product = true;
      this.current_page_product = 1;   
      for (var i = 0; i < this.amount_products_page_product && i < this.products_copy.length ; i++) {
          this.display_products[i] = this.products_copy[i];
      }
    }
    else {
      this.display_pages_product = false;
      this.display_products = this.products_copy;
    }
	}

  // Lay thong tin don nhap hang va gui len server
  createOrder(formCreateOrder) { 
    var i, j = 0;  
    for (i = 0; i < this.products_order.length; i++) {
      if(this.products_order[i].amount == 0) {
        this.products_order[i].checkAmount = true; 
        j++;
      } 
      if(this.products_order[i].prices == 0) {
        this.products_order[i].checkPrices = true; 
        j++;
      } 
    }
    if (j == 0) {
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
        'import_date': ngay_du_kien, 'products': this.products_order, 'amount_total': this.total_amount});
      this.http.post(url, body, { headers: headers })
      .toPromise()
      .then(res => res.json())
      .then(resJson => {
        // Them don hang thanh cong
        if (resJson == "1") {
          this.router.navigateByUrl('/quanlydonhang/nhap_hang_dat_hang');
        }
        else {
          alert("Error!");
        }
      })
    }
  }
}
