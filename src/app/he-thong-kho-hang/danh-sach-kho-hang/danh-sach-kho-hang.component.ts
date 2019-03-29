import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-danh-sach-kho-hang',
  templateUrl: './danh-sach-kho-hang.component.html',
  styleUrls: ['./danh-sach-kho-hang.component.css']
})
export class DanhSachKhoHangComponent implements OnInit {
  
  formSearchContainer: FormGroup;
  containers = new Array(); // mang chua danh sach kho hang
  constructor(private http: Http, private fb: FormBuilder, private router: Router) { }

  async ngOnInit() {
  	this.containers.splice(0, this.containers.length);
  	this.formSearchContainer = this.fb.group({
  		name:'',
  		code:''
  	});

    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 

  	const url = "http://localhost:3000/getMenuContainer";
  	const headers = new Headers({ 'Content-Type': 'application/json' });
  	await this.http.get(url, { headers: headers })
  	.toPromise()
  	.then(res => res.json())
  	.then(resJson => {
  		for(var i = 0; i < resJson.length; i++) {
  			this.containers[i] = resJson[i];
  		}
  	})
  }

  // Tim kiem kho hang
  searchContainer(formSearchContainer) {
    this.containers.splice(0, this.containers.length);
    const url = "http://localhost:3000/searchContainer";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(formSearchContainer.value);
    this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      for (var i = 0; i < resJson.length; i++) {
        this.containers[i] = resJson[i];
      }
    })
  }

}
