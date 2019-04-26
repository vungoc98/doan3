import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { AcountInfoService } from '../acount-info.service';
import 'rxjs';

@Component({
  selector: 'app-thong-tin-tai-khoan',
  templateUrl: './thong-tin-tai-khoan.component.html',
  styleUrls: ['./thong-tin-tai-khoan.component.css']
})
export class ThongTinTaiKhoanComponent implements OnInit {

  // Form cap nhat thong tin ca nhan
  formUpdateAcount: FormGroup;
  // message thong bao tinh trang cap nhat
  message;

  // Form thay doi mat khau nguoi dung
  formChangePassword: FormGroup;

  ncc: boolean;
  npp: boolean;
  sieuthi: boolean;
  name: string;
  check: boolean;
  info: Login; // thong tin tai khoan
   

  constructor(private router: Router, private acountInfo: AcountInfoService, private route: ActivatedRoute, private fb: FormBuilder, private http: Http) {
  }

  async ngOnInit() {
    // form cap nhat thong tin ca nhan
    this.formUpdateAcount = this.fb.group({ 
        username: '',
        name: '',
        address: '',
        email: ['', [Validators.email, gmailValidator]],
        mobile: ''
    })

    // Form thay doi mat khau
    this.formChangePassword = this.fb.group({
      oldPassword: '',
      newPassword: '',
      againPassword: ''
    });

    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 
  
    this.info = await this.acountInfo.getInfomation();
   
  	this.route.paramMap.subscribe((params: ParamMap) => {
  		this.name = params.get('name');
  		if (this.name == "npp") {
  			this.npp = true;
  			this.ncc = false;
        this.sieuthi = false;
  		}
  		else if (this.name == "ncc") {
  			this.ncc = true;
  			this.npp = false;
        this.sieuthi = false;
  		}
      else {
        this.sieuthi = true;
        this.npp = false;
        this.ncc = false;
      }
  	})
    this.formUpdateAcount.setValue({ 
        username: this.info.username,
        name: this.info.name,
        address: this.info.address,
        email: this.info.email,
        mobile: this.info.mobile
    })
 
  }

  // Ham xu ly cap nhat thong tin tai khoan
 async updateAcount(formUpdateAcount) {
    // tao duong dan can post len server
    const url = "http://localhost:3000/updateAcount";

    // tao header
    const headers = new Headers({'Content-Type': 'application/json'});
    
    // du lieu gui len server (dang json)
    const body = JSON.stringify(formUpdateAcount.value);
    // console.log("Form: " + formUpdateAcount.value.name);
    // console.log('body:' + body);

    // gui lenh post de lay ket qua tu tra ve tu server
    await this.http.post(url, body, { headers })
    .toPromise()
    .then(res => res.text())
    .then(resText => this.message = resText);

    // set lai information o acountService
    this.info = await this.acountInfo.getInfomation();
    this.info.name = formUpdateAcount.value.name;
    this.info.address = formUpdateAcount.value.address;
    this.info.email = formUpdateAcount.value.email;
    this.info.mobile = formUpdateAcount.value.mobile;
     
    await this.acountInfo.setInfomation(this.info);

    alert(this.message);

  }

  // Ham xu ly thay doi mat khau cua tai khoan 
  async changePassword(formChangePassword) {
    if (formChangePassword.value.oldPassword != this.info.password) {
      alert("Mật khẩu cũ không đúng");
    }
    else if (formChangePassword.value.newPassword != formChangePassword.value.againPassword) {
      alert("Mật khẩu mới không đúng");
    }
    else {
      // url ket noi toi server
      const url = "http://localhost:3000/changePassword";

      // header: Thiet lap dinh dang cua du lieu can gui
      const headers = new Headers({'Content-Type': 'application/json'});

      // body: noi dung can gui den server xu ly
      const body = JSON.stringify({'newPassword': formChangePassword.value.newPassword, 'username': this.info.username});
   
      await this.http.post(url, body, { headers:headers })
      .toPromise()
      .then(res => res.text())
      .then(resText => this.message = resText);
      
      // set lai thong tin information cua acountSerice
      this.info = await this.acountInfo.getInfomation();
      this.info.password = formChangePassword.value.newPassword;

      await this.acountInfo.setInfomation(this.info);

      // Thong bao ket qua thay doi
      alert(this.message);
      this.formChangePassword.setValue({
        oldPassword: '',
        newPassword: '',
        againPassword: ''
      }); 
    } 
  }
}

function gmailValidator(formControl: FormControl) {
  if (formControl.value.includes("@gmail.com") || formControl.value.includes("@email.com")) {
    return null;
  }
  return {gmail: true};
}

class Login { 
  public check;
  public username;
  public password;
  public name;
  public address;
  public email;
  public mobile;
  public acount_type;
  constructor(check, username, password, name, address, email, mobile, acount_type) { 
    this.check = check;
    this.username = username;
    this.password = password;
    this.name = name;
    this.address = address;
    this.email = email;
    this.mobile = mobile;
    this.acount_type = acount_type;
  }
}