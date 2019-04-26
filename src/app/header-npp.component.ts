import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from './login/login.service';
import { AcountInfoService } from './acount-info.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-header-npp',
  templateUrl: './header-NPP.html',
  providers: [ LoginService ]
})
export class HeaderNPPComponent implements OnInit {
//  @Input()loai;
  @Input() name: string;
  tenTk; // luu ten tai khoan cua nguoi dung
  information: Login; // thong tin ban dau cua nguoi dung khi login
  info: Login; // Lay lai thong tin cua nguoi dung khi ho reload lai page
  constructor(private router: Router, private loginService: LoginService, private acountInfo: AcountInfoService, private http: Http) { 
  }

  ngOnInit() { 
    this.tenTk = sessionStorage.getItem('username');
  }
 
  logOut() { 
    this.router.navigateByUrl("");  
    sessionStorage.clear();
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