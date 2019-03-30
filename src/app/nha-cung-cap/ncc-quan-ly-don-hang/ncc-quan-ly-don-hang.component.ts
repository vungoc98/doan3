import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ncc-quan-ly-don-hang',
  templateUrl: './ncc-quan-ly-don-hang.component.html',
  styleUrls: ['./ncc-quan-ly-don-hang.component.css']
})
export class NccQuanLyDonHangComponent implements OnInit {
  
  formSearch: FormGroup;
  orders = new Array();
  order_type = new Set(); // Trang thai don hang
  selectedType = "";
  constructor(private fb: FormBuilder, private http: Http, private router: Router) { }

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
    const url = "http://localhost:3000/getOrders-NCC";
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
    }
  }

  // Tim kiem don hang
  onSearch(formSearch) {
    this.orders.splice(0, this.orders.length);
    const url = "http://localhost:3000/searchOrders-NCC";
    const headers = new Headers( {'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'username': sessionStorage.getItem('username'), 'code': formSearch.value.code.trim(), 'status': this.selectedType });
    this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      if (resJson == '0') alert('Error!');
      else this.orders = resJson;
    })
  }

}
