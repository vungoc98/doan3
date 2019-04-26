import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-sieu-thi-giao-dien-chung',
  templateUrl: './sieu-thi-giao-dien-chung.component.html',
  styleUrls: ['./sieu-thi-giao-dien-chung.component.css'],
  providers: [ LoginService ]
})
export class SieuThiGiaoDienChungComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  	// console.log(this.loginService.getThongTinTaiKhoan());
  }

}
