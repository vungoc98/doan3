import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-danh-sach-san-pham',
  templateUrl: './danh-sach-san-pham.component.html',
  styleUrls: ['./danh-sach-san-pham.component.css']
})
export class DanhSachSanPhamComponent implements OnInit {
  
  formSearch: FormGroup;
  addProduct: boolean = true;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  	this.formSearch = this.fb.group({
  		name: '',
  		code: ''
  	});
  }

  deleteProduct(code) {
    console.log("Xóa sản phẩm có mã: " + code);
  }

  insertProduct() {
     
  }

}
