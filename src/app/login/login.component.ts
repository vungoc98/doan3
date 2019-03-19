import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs'; 
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { NPPService } from 'src/app/nha-phan-phoi/nha-phan-phoi.service';
import { AcountInfoService } from '../acount-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService, NPPService ]
})
export class LoginComponent implements OnInit {
  
  formSignIn: FormGroup;
  thongTinTaiKhoan: any;
  results: any;
  nha_phan_phoi;
  data;
  login = true;
  info: Login;
  @Output() onLogin: EventEmitter<any>;
  constructor(private acountInfo: AcountInfoService, private nppservice: NPPService, private fb: FormBuilder, private http: Http, private router: Router, private loginService: LoginService) { 
    this.onLogin = new EventEmitter();
  }

  ngOnInit() {
  	this.formSignIn = this.fb.group({
  		name: '',
  		password: ''
  	})
  }

  async onSubmit() { 
    // tao duong dan can post len
    const url = "http://localhost:3000/login";

    // tao header
    const headers = new Headers({ 'Content-Type': 'application/json' });

    // lay body gui len
    const body = JSON.stringify(this.formSignIn.value);

    // res la ket qua tra ve tu server
    await this.http.post(url, body, {headers: headers})
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      this.thongTinTaiKhoan = resJson;
      if (this.thongTinTaiKhoan.check == 0) {
        alert("Tài khoản hoặc mật khẩu không đúng");
      }
       
      else{ 
         this.info = new Login(resJson.check, resJson.username, resJson.password, resJson.name, resJson.address, resJson.email, resJson.mobile, resJson.count_type);
         this.acountInfo.setInfomation(this.info);
        if (this.thongTinTaiKhoan.acount_type == "Nhà phân phối") {
         // this.loginService.setThongTinTaiKhoan(this.thongTinTaiKhoan);
        //  this.onLogin.emit(this.loginService.getThongTinTaiKhoan());
          // this.router.navigate(['/nhaphanphoi'], {queryParams: {username: this.thongTinTaiKhoan.username, password: this.thongTinTaiKhoan.password, 
          //   name: this.thongTinTaiKhoan.name, address: this.thongTinTaiKhoan.address, email: this.thongTinTaiKhoan.email, 
          //   mobile: this.thongTinTaiKhoan.mobile}});
          // sessionStorage.setItem('username', this.thongTinTaiKhoan.username);
          // sessionStorage.setItem('password', this.thongTinTaiKhoan.password);
          // sessionStorage.setItem('name', this.thongTinTaiKhoan.name);
          // sessionStorage.setItem('address', this.thongTinTaiKhoan.address);
          // sessionStorage.setItem('email', this.thongTinTaiKhoan.email);
          // sessionStorage.setItem('mobile', this.thongTinTaiKhoan.mobile);
          console.log(this.thongTinTaiKhoan);
          this.router.navigate(['/nhaphanphoi']);
         // console.log("Lay username: " + localStorage.getItem('username'));
          //this.router.navigateByUrl("/nhaphanphoi");
        }
        else if (this.thongTinTaiKhoan.acount_type == "Nhà cung cấp") {
          this.router.navigateByUrl("/nhacungcap");
        }
        else if (this.thongTinTaiKhoan.acount_type == "Siêu thị") {
          this.router.navigateByUrl("/sieuthi");
        }
      }
        
    });
    
    // this.data = this.loginService.getThongTinTaiKhoan();
    // this.login = false;
    // this.nha_phan_phoi = true;
    
  }
  hienthi() {
     console.log(this.loginService.getThongTinTaiKhoan());
  }

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