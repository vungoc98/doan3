import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ncc-quan-ly-don-hang',
  templateUrl: './ncc-quan-ly-don-hang.component.html',
  styleUrls: ['./ncc-quan-ly-don-hang.component.css']
})
export class NccQuanLyDonHangComponent implements OnInit {
  
  formSearch: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  	this.formSearch = this.fb.group({
  		name: ''
  	})
  }

}
