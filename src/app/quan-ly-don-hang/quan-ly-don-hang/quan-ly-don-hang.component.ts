import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
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
  constructor(private fb: FormBuilder, private http: Http, private router: Router) { }

  ngOnInit() {
  	this.formSearch = this.fb.group({
  		code: '', // Ma don hang
      name: '' // Ten nha cung cap (hoac sieu thi)
  	});

    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 

    // Lay danh sach don nhap hang
    var url = "http://localhost:3000/getOrderImportInfo";
    var headers = new Headers( {'Content-Type': 'application/json' });
    this.http.get(url, { headers: headers})
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      for (var i = 0; i < resJson.length; i++) {
        this.listOrderImport[i] = resJson[i];
      }
    })

    // Lay danh sach don dat hang
    url = "http://localhost:3000/getOrderExportInfo";
    headers = new Headers( {'Content-Type': 'application/json' });
    this.http.get(url, { headers: headers})
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      for (var i = 0; i < resJson.length; i++) {
        this.listOrderExport[i] = resJson[i];
      }
    })
  }

  // Tim loai don hang => hien giao dien tuong ung
  select(type: string) {
    this.order_type = type;
  }

  // Tim kiem don hang theo ma don hang va ten (nha cung cap hoac sieu thi)
  searchOrder(formSearch) { 
    const url = "http://localhost:3000/searchOrder";
    const headers = new Headers( {'Content-Type': 'application/json' });
    const body = JSON.stringify({'name': formSearch.value.name, 'code': formSearch.value.code, 'order_type': this.order_type});
    this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      if (this.order_type == 'nhaphang') { 
      this.listOrderImport.splice(0, this.listOrderImport.length); 
        for (var i = 0; i < resJson.length; i++) {
          this.listOrderImport[i] = resJson[i];
        }
      }
      else {
        this.listOrderExport.splice(0, this.listOrderExport.length);
        for (var i = 0; i < resJson.length; i++) {
          this.listOrderExport[i] = resJson[i];
          // if (this.listOrderExport[i].status == "Đã giao") {
          //   this.listOrderExport[i].
          // }
        }
      }
    })
  }

}
