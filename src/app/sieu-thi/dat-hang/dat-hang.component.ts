import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dat-hang',
  templateUrl: './dat-hang.component.html',
  styleUrls: ['./dat-hang.component.css']
})
export class DatHangComponent implements OnInit {

  modalRef: BsModalRef;
  formSearch: FormGroup;
  constructor(private modalService: BsModalService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
  	this.formSearch = this.fb.group({
  		name: '',
  		code: ''
  	});
  }

  onSubmit() {
    
  }

  openModal(template: TemplateRef<any>) {
  	this.modalRef = this.modalService.show(template);
  }

  checkbox() {
  	this.modalRef.hide();
  	// for (var i = 0; i < 4; i++) {
  	// 	if(this.subjects[i].checked == true) {
  	// 		console.log(this.subjects[i].id);
  	// 	}
  	// }
  }

  insertProduct() {

  }

  // Tim cach chuyen huong den tab khac
  taoDonHang() { 
    this.router.navigateByUrl('/hethongsanpham/taomoisanpham');
    
    // this.router.navigate(['hethongsanpham/taomoisanpham']);
  }
}