import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-quan-ly-don-hang',
  templateUrl: './quan-ly-don-hang.component.html',
  styleUrls: ['./quan-ly-don-hang.component.css']
})
export class QuanLyDonHangComponent implements OnInit {
  
  formSearch: FormGroup;
  xuathang: boolean = false;
  xemchitiet: boolean = true;
  listOrderImport = new Array(); // danh sach don nhap hang
  listOrderExport = new Array(); // danh sach don dat hang
  order_type; // Loai don hang (don nhap hang, don dat hang)
  total_page;// tong so trang
  page; // Chi so trang
  display_pages: boolean = false; // Co hien trang hay khong 
  current_page = 1; // Set active cho cac page
  number = 5;
  display_listOrderImport = []; // chua danh sach cac don hang hien thi theo tung trang (moi trang co number don hang)
  display_listOrderExport = [];
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: Http, private router: Router) { }

  async ngOnInit() {
  	this.formSearch = this.fb.group({
  		code: '', // Ma don hang
      name: '' // Ten nha cung cap (hoac sieu thi)
  	});

    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 

    // Mac dinh la tab nhap hang
    this.order_type = "nhaphang";

    // Lay danh sach don nhap hang
    var url = "http://localhost:3000/getOrderImportInfo";
    var headers = new Headers( {'Content-Type': 'application/json' });
    await this.http.get(url, { headers: headers})
    .toPromise()
    .then(res => res.json())
    .then(resJson => { 
        this.listOrderImport = resJson
    })
    // Kiem tra so luong don hang co du lon de hien thi trang
    if (this.listOrderImport.length > this.number) this.display_pages = true; 
    for (var i = 0; i < this.number && i < this.listOrderImport.length; i++) {
      this.display_listOrderImport[i] = this.listOrderImport[i];
    }  
  }

  // Tim loai don hang => hien giao dien tuong ung
  async select(type: string) { 
    this.display_pages = false;
    this.order_type = type;
    this.current_page = 1;
    var url;
    if (this.order_type == "nhaphang") {
      url = "http://localhost:3000/getOrderImportInfo";
    }
    else {
      url = "http://localhost:3000/getOrderExportInfo";
    }
    var headers = new Headers( {'Content-Type': 'application/json' });
    await this.http.get(url, { headers: headers})
    .toPromise()
    .then(res => res.json())
    .then(resJson => { 
      if (this.order_type == "nhaphang") {
        this.listOrderImport = resJson;
      }
      else this.listOrderExport = resJson;
    })
    if (this.order_type == "nhaphang") {
      // Kiem tra so luong don  hang co du lon de hien thi trang
      if (this.listOrderImport.length > this.number) this.display_pages = true; 
      for (var i = 0; i < this.number && i < this.listOrderImport.length; i++) {
        this.display_listOrderImport[i] = this.listOrderImport[i];
      } 
    }
    else {
      // Kiem tra so luong don hang co du lon de hien thi trang
      if (this.listOrderExport.length > this.number) this.display_pages = true;  

      for (var i = 0; i < this.number && i < this.listOrderExport.length; i++) {
        this.display_listOrderExport[i] = this.listOrderExport[i];
      }  
    } 
    this.router.navigateByUrl('/quanlydonhang/nhap_hang_dat_hang'); 
  }

  // Tim kiem don hang theo ma don hang va ten (nha cung cap hoac sieu thi)
  async searchOrder(formSearch) { 
    const url = "http://localhost:3000/searchOrder";
    const headers = new Headers( {'Content-Type': 'application/json' });
    const body = JSON.stringify({'name': formSearch.value.name, 'code': formSearch.value.code, 'order_type': this.order_type});
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => { 
      if (this.order_type == 'nhaphang') { 
        this.listOrderImport.splice(0, this.listOrderImport.length);  
        this.display_listOrderImport.splice(0, this.display_listOrderImport.length);
        this.listOrderImport= resJson;
        for (var i = 0; i < this.listOrderImport.length && i < this.number; i++) {
          this.display_listOrderImport[i] = this.listOrderImport[i];
        }
        // Kiem tra co hien so trang hay khong
        if (this.listOrderImport.length > this.number) {
          for (var i = 0; i < this.number; i++) {
            this.display_listOrderImport[i] = this.listOrderImport[i];
          }
          this.display_pages = true;
          this.current_page = 1;
        }
        else this.display_pages = false; 
      }
      else {
        this.listOrderExport.splice(0, this.listOrderExport.length); 
        this.display_listOrderExport.splice(0, this.display_listOrderExport.length);
        this.listOrderExport = resJson;
        for (var i = 0; i < this.number && i < this.listOrderExport.length; i++) {
          this.display_listOrderExport[i] = this.listOrderExport[i];
        }
        // Kiem tra co hien so trang hay khong
        if (this.listOrderExport.length > this.number) {
          for (var i = 0; i < this.number; i++) {
            this.display_listOrderExport[i] = this.listOrderExport[i];
          }
          this.display_pages = true;
          this.current_page = 1;
        }
        else this.display_pages = false;
      }
    })
    
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
    if (this.order_type == "nhaphang") {
      this.display_listOrderImport.splice(0, this.display_listOrderImport.length);
    }
    else {
      this.display_listOrderExport.splice(0, this.display_listOrderExport.length);
    }
    if (page == 1) { 
      this.router.navigateByUrl('/quanlydonhang/nhap_hang_dat_hang'); 
      for (var i = 0; i < this.number; i++) {
        if (this.order_type == "nhaphang") {
          this.display_listOrderImport[i] = this.listOrderImport[i];
        }
        else {
          this.display_listOrderExport[i] = this.listOrderExport[i];
        }
      } 
    }
    else { 
      this.router.navigate(['/quanlydonhang/nhap_hang_dat_hang'], {queryParams: {page: page}}); 
      var k = 0; 
      if (this.order_type == "nhaphang") {
        for (var i = (page - 1) * this.number; i < (page * this.number) && i < this.listOrderImport.length; i++) {
          this.display_listOrderImport[k] = this.listOrderImport[i];  
          k++; 
        } 
      }
      else {
        for (var i = (page - 1) * this.number; i < (page * this.number) && i < this.listOrderExport.length; i++) {
          this.display_listOrderExport[k] = this.listOrderExport[i];
          k++; 
        }
      }  
    }
  }

}
