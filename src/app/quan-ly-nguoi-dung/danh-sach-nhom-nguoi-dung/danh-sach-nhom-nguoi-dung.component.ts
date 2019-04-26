import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-danh-sach-nhom-nguoi-dung',
  templateUrl: './danh-sach-nhom-nguoi-dung.component.html',
  styleUrls: ['./danh-sach-nhom-nguoi-dung.component.css']
})
export class DanhSachNhomNguoiDungComponent implements OnInit {
  formAddDistributor: FormGroup;
  formSearch: FormGroup;
  modalRef: BsModalRef;  
  users_all = new Array(); // danh sach tat ca nguoi dung
  users = new Array(); // Danh sach nguoi dung cua tung tab
  acount_type; // phan loai nguoi dung
  srcImage;
  total_page;// tong so trang
  page; // Chi so trang
  display_pages: boolean = false; // Co hien trang hay khong 
  current_page = 1; // Set active cho cac page
  number = 5;
  display_users = []; // Chua so nguoi dung hien thi tung trang (moi trang co number nguoi dung)
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private modalService: BsModalService, private http: Http, private element: ElementRef) { }

  async ngOnInit() {
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

    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 

    // lay danh sach tat ca nguoi dung
    this.users.splice(0, this.users.length);
    var url = "http://localhost:3000/getAllUserInfo";
    var headers = new Headers({ 'Content-Type': 'application/json' }); 
    await this.http.get(url, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {  
      this.users_all = resJson; 
    })

    // lay danh sach nguoi dung cho tab mac dinh
    this.users.splice(0, this.users.length);
    url = "http://localhost:3000/getUserInfo";
    headers = new Headers({ 'Content-Type': 'application/json' });
    var body = JSON.stringify({ 'acount_type': 'Nhà phân phối' });
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => { 
      for (var i = 0; i < resJson.length; i++) {
        this.users[i] = resJson[i];
      }
    })
    // Kiem tra so luong users co du lon de hien thi trang
    if (this.users.length > this.number) this.display_pages = true;
    // Lay so trang
    this.route.queryParams.subscribe((params: ParamMap) => {
      this.page = params['page'];  
    })  
    // Kiem tra nguoi dung co bam chon trang khac trang 1 ( tu 2 den ...)
    if (this.page != undefined) {  
      var k = 0;
      for (var i = (this.page - 1) * this.number; i < (this.page * this.number) && i < this.users.length; i++) {
        this.display_users[k] = this.users[i];
        k++;
      }

      // set active cho trang hien tai
      this.current_page = this.page;
    }
    else {
      for (var i = 0; i < this.number && i < this.users.length; i++) {
        this.display_users[i] = this.users[i];
      }
    } 
    this.acount_type = "Nhà phân phối";
  }
  
  // Lay danh sach nguoi dung
  async select(type: string) { 
    this.display_pages = false;
    this.page = 1;
    this.users.splice(0, this.users.length);
    this.display_users.splice(0, this.display_users.length);
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
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      for (var i = 0; i < resJson.length; i++) {
        this.users[i] = resJson[i];
      }
    }) 
     // Kiem tra so luong user co du lon de hien thi trang
    if (this.users.length > this.number) this.display_pages = true;
    
    // Kiem tra nguoi dung co bam chon trang khac trang 1 ( tu 2 den ...)
    if (this.page != undefined) {  
      var k = 0;
      for (var i = (this.page - 1) * this.number; i < (this.page * this.number) && i < this.users.length; i++) {
        this.display_users[k] = this.users[i];
        k++;
      }

      // set active cho trang hien tai
      this.current_page = this.page;
    }
    else {
      for (var i = 0; i < this.number && i < this.users.length; i++) {
        this.display_users[i] = this.users[i];
      }
    }
  }

  // Tim kiem nguoi dung 
  async searchUser(formSearch) { 
    this.users.splice(0, this.users.length);
    this.display_users.splice(0, this.display_users.length);
    const url = "http://localhost:3000/searchUserInfo";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'acount_type': this.acount_type, 'name': formSearch.value.name.trim(), 'code': formSearch.value.code.trim() });
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      this.users = resJson; 
    })
    for (var i = 0; i < this.number && i < this.users.length; i++) {
      this.display_users[i] = this.users[i];
    }
    // Kiem tra co hien so trang hay khong
    if (this.users.length > this.number) {
      this.display_pages = true;
      this.current_page = 1;
    }
    else this.display_pages = false;
  }

   // Xac dinh so trang chua san pham
  range(products_length: number) {
    var res = []; 
    this.total_page= Math.ceil(products_length/this.number);
    for (var i = 0; i < this.total_page; i++) {
      res.push(i + 1);
    }
    return res;
  }

  changePage(page) {  
    this.current_page = page;
    this.display_users.splice(0, this.display_users.length);
    if (page == 1) { 
      this.router.navigateByUrl('/quanlynguoidung'); 
      for (var i = 0; i < this.number; i++) {
        this.display_users[i] = this.users[i];
      } 
    }
    else { 
      this.router.navigate(['/quanlynguoidung'], {queryParams: {page: page}}); 
      var k = 0;
      for (var i = (page - 1) * this.number; i < (page * this.number) && i < this.users.length; i++) {
        this.display_users[k] = this.users[i];
        k++;
      }  
    }
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
    var index = this.users_all.findIndex(user => user.username == this.formAddDistributor.value.username);
    // Kiem tra 2 password co giong nhau
    if (this.formAddDistributor.value.password != this.formAddDistributor.value.password1) {
      alert("Mật khẩu không khớp!");
    }
    else if(index != -1) {  
      alert("Trùng tên tài khoản!"); 
    }
    else { 
      this.users.splice(0, this.users.length);
      index = this.formAddDistributor.value.image.lastIndexOf("\\");
      var image = this.formAddDistributor.value.image.substring(index + 1);
      const url = "http://localhost:3000/addDistributor";
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const body = JSON.stringify({'name': this.formAddDistributor.value.name, 'username': this.formAddDistributor.value.username,
        'password': this.formAddDistributor.value.password, 'address': this.formAddDistributor.value.address,
        'mobile': this.formAddDistributor.value.mobile, 'email': this.formAddDistributor.value.email, 'image': image, 'user_id': sessionStorage.getItem('username')});
      await this.http.post(url, body, { headers: headers })
      .toPromise()
      .then(res => res.json())
      .then(resJson => { 
        for (var i = 0; i < resJson.length; i++) { 
          this.users[i] = resJson[i];
        }
      })
      for (var i = 0; i < this.number && i < this.users.length; i++) {
        this.display_users[i] = this.users[i];
      }
      // Kiem tra co hien so trang hay khong
      if (this.users.length > this.number) {
        this.display_pages = true;
        this.current_page = 1;
      }
      else this.display_pages = false;
      this.users_all.push(this.users[this.users.length - 1]);
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
// class User{
//   public id;
//   public username;
//   public password;
//   public name;
//   public address;
//   public email;
//   public mobile;
//   public code;
//   public image;
//   public status;
//   public acount_type;
//   public dele;
//   public create_date;
//   public update_date
//   public user_id;
//   constructor(id = "", username, password="", name="", address="", email="", mobile=""
//     , code="", image="", status="", acount_type="", dele="", create_date="", update_date="", user_id=""){
//     this.id = id;
//     this.username = username;
//     this.password = password;
//     this.name = name;
//     this.address = address;
//     this.email = email;
//     this.mobile = mobile;
//     this.code = code;
//     this.image = image;
//     this.status = status;
//     this.acount_type = acount_type;
//     this.dele = dele;
//     this.create_date = create_date;
//     this.update_date = update_date;
//     this.user_id = user_id;
//   }
// }