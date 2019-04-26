import { Component, OnInit, Input } from '@angular/core';
import { NPPService } from './nha-phan-phoi.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-nha-phan-phoi',
  templateUrl: './nha-phan-phoi.component.html',
  styleUrls: ['./nha-phan-phoi.component.css'],
  providers: [NPPService]
})
export class NhaPhanPhoiComponent implements OnInit {
  isShow1: boolean = true;
  isShow2: boolean = true;
  isShow3: boolean = true;
  isShow4: boolean = true;
  acountInfo: any;

  onClick() {
  	this.isShow1 = false;
  	this.isShow2 = false;
  	this.isShow3 = false;
  	this.isShow4 = false;
  }

  onClick1() {
  	this.isShow1 = true;
  	this.isShow2 = false;
  	this.isShow3 = false;
  	this.isShow4 = false;
  }
  onClick2() {
  	this.isShow1 = false;
  	this.isShow2 = true;
   	this.isShow3 = false;
   	this.isShow4 = false;
  }
  onClick3() {
  	this.isShow1 = false;
  	this.isShow2 = false;
   	this.isShow3 = true;
   	this.isShow4 = false;
  }
  onClick4() {
  	this.isShow1 = false;
  	this.isShow2 = false;
   	this.isShow3 = false;
   	this.isShow4 = true;
  }
  constructor(private route: ActivatedRoute, private nppservice: NPPService, private router: Router) {
    this.acountInfo = new AcountInfo();
  }

  ngOnInit() {

    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 
    
  } 
   
}

class AcountInfo {
  public username: string;
  public password: string;
  public name: string;
  public address: string;
  public email: string;
  public mobile: string;
  constructor(username?, password?, name?, address?, email?, mobile?) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.address = address;
    this.email = email;
    this.mobile = mobile;
  }
   
}