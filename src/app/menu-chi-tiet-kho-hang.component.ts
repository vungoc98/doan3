import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-menu-chi-tiet-kho-hang',
  templateUrl: './menu-chi-tiet-kho-hang.component.html',
})
export class MenuChiTietKhoHangComponent implements OnInit {
  id: string;
  thongtincoban: boolean = false;
  formUpdateContainer: FormGroup;
  formSearch: FormGroup;
  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.formUpdateContainer = this.fb.group({
      name: '',
      code: '',
      address: '',
      phoneNumber: '',
    });

    this.formSearch = this.fb.group({
      name: '',
      code: '',
    });
     
  	this.route.paramMap.subscribe((params: ParamMap) => {
  		this.id = params.get('id');
  	});

  	console.log("lay duoc id = "  + this.id);
  }

  thongTinCoBan() {
    this.thongtincoban = true;
    console.log("haha");
    //this.document.location.href = 'localhost:4200/nhaphanphoi/login';
  }

  onSubmitUpdate() {

  }

}
