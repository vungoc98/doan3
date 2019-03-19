import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-danh-sach-nhom-nguoi-dung',
  templateUrl: './danh-sach-nhom-nguoi-dung.component.html',
  styleUrls: ['./danh-sach-nhom-nguoi-dung.component.css']
})
export class DanhSachNhomNguoiDungComponent implements OnInit {
  formAddDistributor: FormGroup;
  formSearch: FormGroup;
  modalRef: BsModalRef;  
  users = new Array(); // Danh sach nguoi dung 
  acount_type; // phan loai nguoi dung
  srcImage;
  constructor(private fb: FormBuilder, private modalService: BsModalService, private http: Http, private element: ElementRef) { }

  ngOnInit() {
    this.formAddDistributor = this.fb.group({
      name: '',
      username: '',
      password: '',
      password1: '',
      address: '',
      mobile: '',
      email: ['', [Validators.email, gmailValidator]],
      image: ''
    });

  	this.formSearch = this.fb.group({
      name: '',
  		code: ''
  	}); 

    // lay danh sach nguoi dung cho tab mac dinh
    this.users.splice(0, this.users.length);
    const url = "http://localhost:3000/getUserInfo";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'acount_type': 'Nhà phân phối' });
    this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      for (var i = 0; i < resJson.length; i++) {
        this.users[i] = resJson[i];
      }
    })
    this.acount_type = "Nhà phân phối";
  }
  
  // Lay danh sach nguoi dung
  select(type: string) { 
    this.users.splice(0, this.users.length);
    const url = "http://localhost:3000/getUserInfo";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    var body;
    if (type == 'nhaphanphoi') {
      body = JSON.stringify({ 'acount_type': 'Nhà phân phối' });
      this.acount_type = "Nhà phân phối";
    }
    else if (type == 'nhacungcap') {
      body = JSON.stringify({ 'acount_type': 'Nhà cung cấp' });
      this.acount_type = "Nhà cung cấp";
    }
    else {
      body = JSON.stringify({ 'acount_type': 'Siêu thị' });
      this.acount_type = "Siêu thị";
    }
    this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      for (var i = 0; i < resJson.length; i++) {
        this.users[i] = resJson[i];
      }
    }) 
  }

  // Tim kiem nguoi dung 
  searchUser(formSearch) { 
    this.users.splice(0, this.users.length);
    const url = "http://localhost:3000/searchUserInfo";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'acount_type': this.acount_type, 'name': formSearch.value.name.trim(), 'code': formSearch.value.code.trim() });
    this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      for (var i = 0; i < resJson.length; i++) {
        this.users[i] = resJson[i];
      }
    })
  }

  // Tao nhan vien moi
  openModal(template: TemplateRef<any>) { 
      this.formAddDistributor.setValue({
      name: '',
      username: '',
      password: '',
      password1: '',
      address: '',
      mobile: '',
      email: '',
      image: ''
    });
    this.srcImage = "";
    this.modalRef = this.modalService.show(template);
  }

  // chon anh
  changeListener(event) {  
      var reader = new FileReader(); 
      this.srcImage = "../assets/images/" + event.target.files[0].name;
  }
 

  // Them nhan vien moi
  async addDistributor() {
    // Kiem tra 2 password co giong nhau
    if (this.formAddDistributor.value.password != this.formAddDistributor.value.password1) {
      alert("Mật khẩu sai!");
    }
    else {
      this.users.splice(0, this.users.length);
      var index = this.formAddDistributor.value.image.lastIndexOf("\\");
      var image = this.formAddDistributor.value.image.substring(index + 1);
      const url = "http://localhost:3000/addDistributor";
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const body = JSON.stringify({'name': this.formAddDistributor.value.name, 'username': this.formAddDistributor.value.username,
        'password': this.formAddDistributor.value.password, 'address': this.formAddDistributor.value.address,
        'mobile': this.formAddDistributor.value.mobile, 'email': this.formAddDistributor.value.email, 'image': image});
      this.http.post(url, body, { headers: headers })
      .toPromise()
      .then(res => res.json())
      .then(resJson => {
        for (var i = 0; i < resJson.length; i++) {
          this.users[i] = resJson[i];
        }
      })
      this.modalRef.hide();
    }
  }

  // Xem chi tiet nhan vien
  openModal1(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template1);
  }

  // Xem chi tiet nha cung cap
  openModal2(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template2);
  }

  // Xem chi tiet sieu thi
  openModal3(template3: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template3);
  }

  choosed() {
    this.modalRef.hide();
  }

}
function gmailValidator(formControl: FormControl) {
  if (formControl.value.includes("@gmail.com") || formControl.value.includes("@email.com")) {
    return null;
  }
  return {gmail: true};
}