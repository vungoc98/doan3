import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-tinh-trang-kho-hang',
  templateUrl: './tinh-trang-kho-hang.component.html',
  styleUrls: ['./tinh-trang-kho-hang.component.css']
})
export class TinhTrangKhoHangComponent implements OnInit {

  id: string;
  formSearch: FormGroup;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private route: ActivatedRoute, private fb: FormBuilder) { }

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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
