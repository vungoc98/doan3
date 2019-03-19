import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sieu-thi-quan-ly-don-hang',
  templateUrl: './sieu-thi-quan-ly-don-hang.component.html',
  styleUrls: ['./sieu-thi-quan-ly-don-hang.component.css']
})
export class SieuThiQuanLyDonHangComponent implements OnInit {
  
  formSearch: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  	this.formSearch = this.fb.group({
  		name: ''
  	});
  }

}
