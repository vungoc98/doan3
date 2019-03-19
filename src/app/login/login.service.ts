import { Injectable } from '@angular/core'
import { Subject } from 'rxjs';
import 'rxjs';

@Injectable()

export class LoginService {
	 public thongTinTaiKhoan: any;
	//public thongTinTaiKhoan: Subject<any>;
	// public taikhoan: Subject<any>;
	//public vidu: any;
	constructor() {

		// this.taikhoan = new Subject();
		//this.thongTinTaiKhoan = new Subject();
	}
	// generateSelectedAgentData(tk) {
	// 	this.thongTinTaiKhoan.next(tk);
	// 	console.log(this.thongTinTaiKhoan);
	// }
	// getTK() {
	// 	return this.thongTinTaiKhoan;
	// }
	// setTaiKhoan(tk) {
	// 	this.taikhoan.next(tk);
	// }
	// getTaiKhoan() {
	// 	return this.taikhoan;
	// }
	setThongTinTaiKhoan(thongTinTaiKhoan) { 
		 this.thongTinTaiKhoan = thongTinTaiKhoan;
	}
	getThongTinTaiKhoan() {
			// console.log("Thong tin: " + this.thongTinTaiKhoan);
		// this.thongTinTaiKhoan.subscribe(data => {
		// 	console.log("data" + data);
		// 	this.vidu = data;
		// 	return this.vidu;
		// });
		//console.log("Ko: " + this.thongTinTaiKhoan);

		return this.thongTinTaiKhoan;
	}
}