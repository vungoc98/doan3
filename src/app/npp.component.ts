import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-npp',
  templateUrl: './nha-phan-phoi.html',
  styleUrls: ['./nha-phan-phoi/nha-phan-phoi.component.css']
})
export class NPPComponent implements OnInit {
  isShow1: boolean = false;
  isShow2: boolean = false;
  isShow3: boolean = false;
  isShow4: boolean = false;
  @Input() check: string;

  onClick() {
  	this.isShow1 = false;
  	this.isShow2 = false;
  	this.isShow3 = false;
  	this.isShow4 = false;
  }

  onClick1() {
    console.log("Vao day");
  	this.isShow1 = !this.isShow1;
  	this.isShow2 = false;
  	this.isShow3 = false;
  	this.isShow4 = false;
  }
  onClick2() {
    this.isShow2 = !this.isShow2;
  	this.isShow1 = false;
   	this.isShow3 = false;
   	this.isShow4 = false;
  }
  onClick3() {
    this.isShow3 = !this.isShow3;
  	this.isShow1 = false;
  	this.isShow2 = false;
   	this.isShow4 = false;
  }
  onClick4() {
    this.isShow4 = !this.isShow4;
  	this.isShow1 = false;
  	this.isShow2 = false;
   	this.isShow3 = false;
  }
  constructor() { }

  ngOnInit() {
    if (this.check == "isShow1") {
      this.isShow1 = true;
    }
    if (this.check == "isShow2") {
      this.isShow2 = true;
    }
    if (this.check == "isShow3") {
      this.isShow3 = true;
    }
    if (this.check == "isShow4") {
      this.isShow4 = true;
    }
  }

  // reloadPage() {
  //   this.router.navigateByUrl('/hethongsanpham/danhsachsanpham');
  // }

}
