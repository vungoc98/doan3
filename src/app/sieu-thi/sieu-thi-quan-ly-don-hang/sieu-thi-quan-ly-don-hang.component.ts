import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-sieu-thi-quan-ly-don-hang',
  templateUrl: './sieu-thi-quan-ly-don-hang.component.html',
  styleUrls: ['./sieu-thi-quan-ly-don-hang.component.css']
})
export class SieuThiQuanLyDonHangComponent implements OnInit {
  
  formSearch: FormGroup;
  orders = new Array();
  order_type = new Set(); // Trang thai don hang
  selectedType = "";
  constructor(private fb: FormBuilder, private router: Router, private http: Http) { }

  async ngOnInit() {
  	this.formSearch = this.fb.group({
  		code: ''
  	});

    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 

    // Lay danh sach don hang
    const url = "http://localhost:3000/getOrders-SieuThi";
    const headers = new Headers( {'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'username': sessionStorage.getItem('username') });
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      if (resJson == '0') alert('Error!');
      else this.orders = resJson;
    })
    for (var i = 0; i < this.orders.length; i++) {
      this.order_type.add(this.orders[i].status);
      console.log("Haha");
    } 
    console.log(this.orders.length);
  }

   // Tim kiem don hang
  onSearch(formSearch) {
    this.orders.splice(0, this.orders.length);
    const url = "http://localhost:3000/searchOrders-SieuThi";
    const headers = new Headers( {'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'username': sessionStorage.getItem('username'), 'code': formSearch.value.code, 'status': this.selectedType });
    this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      if (resJson == '0') alert('Error!');
      else this.orders = resJson;
    })
  }


}
