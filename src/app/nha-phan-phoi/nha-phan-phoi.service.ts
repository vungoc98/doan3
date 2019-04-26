import { Injectable } from '@angular/core'
import { Subject } from 'rxjs';
import 'rxjs';

@Injectable()

export class NPPService {
	 public thongTinTaiKhoan: any;
 
	constructor() {
 
	}
 
	setThongTinTaiKhoan(thongTinTaiKhoan) {

		(this.thongTinTaiKhoan = thongTinTaiKhoan);
	}
	getThongTinTaiKhoan() {
	 
		return this.thongTinTaiKhoan;
	}
}