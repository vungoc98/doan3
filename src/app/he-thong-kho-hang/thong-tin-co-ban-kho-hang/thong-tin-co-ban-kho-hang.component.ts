import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-thong-tin-co-ban-kho-hang',
  templateUrl: './thong-tin-co-ban-kho-hang.component.html',
  styleUrls: ['./thong-tin-co-ban-kho-hang.component.css']
})
export class ThongTinCoBanKhoHangComponent implements OnInit {
  id: string;
  formUpdateContainer: FormGroup;
  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.paramMap.subscribe((params: ParamMap) => {
  		this.id = params.get('id');
  	})

  	this.formUpdateContainer = this.fb.group({
  		name: '',
  		code: '',
  		address: '',
  		phoneNumber: '',
  	});
  }

  onSubmit() {

  }

}
