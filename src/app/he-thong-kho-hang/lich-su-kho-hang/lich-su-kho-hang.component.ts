import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-lich-su-kho-hang',
  templateUrl: './lich-su-kho-hang.component.html',
  styleUrls: ['./lich-su-kho-hang.component.css']
})
export class LichSuKhoHangComponent implements OnInit {

  id: string;
  formSearch: FormGroup;
  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
  	this.route.paramMap.subscribe((params: ParamMap) => {
  		this.id = params.get('id');
  	})

    this.formSearch = this.fb.group({
      name: '',
      code: '',
    });
  }

  onSubmit() {
    
  }

}
