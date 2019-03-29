import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tao-moi-kho-hang',
  templateUrl: './tao-moi-kho-hang.component.html',
  styleUrls: ['./tao-moi-kho-hang.component.css']
})
export class TaoMoiKhoHangComponent implements OnInit {
  check_username; // Kiem tra login hay logout
  formCreateNewContainer: FormGroup;
  constructor(private fb: FormBuilder, private http: Http, private router: Router) { }

  ngOnInit() {
  	this.formCreateNewContainer = this.fb.group({
  		name: '',
  		address: '',
  		mobile: '',
  	})
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) {
      this.check_username = false;
      this.router.navigateByUrl("", {skipLocationChange: true});  
    }
    else this.check_username = true;
  }

  onSubmit(formCreateNewContainer) {
	  const url = "http://localhost:3000/createContainer";

    const headers = new Headers({ 'Content-Type': 'application/json' });

    const body = JSON.stringify(formCreateNewContainer.value);
     
    this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.text())
    .then(resText => {
      /*
       * Neu thanh cong (resText = 1) chuyen huong den trang danh sach san pham
       * Neu resText = 0 => hien thong bao loi
       */
      if (resText == "1") {
       this.router.navigateByUrl('hethongkhohang/danhsachkhohang');
      }
      else {
       alert("Error");
      }
    })
  } 
}
