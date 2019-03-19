import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AcountInfoService } from '../acount-info.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  formRegister: FormGroup;
  selectedType = "";// chon nhom nguoi dung
  acount_type = new Array(); // mang nhom nguoi dung
  info: Login; // chua thong tin tai khoan
  
  constructor(private acountInfo: AcountInfoService, private fb: FormBuilder, private http: Http, private element: ElementRef, private router: Router) { 
     
  }

  async ngOnInit() {
    // Lay nhom nguoi dung
    // url ket noi toi server
    const url = "http://localhost:3000/getAcount_Type";

    // headers dinh dang du lieu gui - nhan
    const headers = new Headers({'Content-Type': 'application/json'});

    this.http.get(url, { headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      for(var i = 0; i < resJson.length; i++) {
        this.acount_type.push(resJson[i].acount_type); 
      }
    })
    console.log(this.acount_type);
  	this.formRegister = this.fb.group({
  		name: '',
  		username: '',
  		password: '',
  		password1: '',
  		address: '',
  		mobile: '',
  		email: ['', [Validators.email, gmailValidator]],
  		image: ''
  	});
     console.log(this.acount_type);
  }

  // chon anh
  changeListner(event) {
      var reader = new FileReader();
      var image = this.element.nativeElement.querySelector('.image');

      reader.onload = function(e) {
          var src = e.target['result'];
          image.src = src;
      };

      reader.readAsDataURL(event.target.files[0]);
      image.width = 100;
      image.height = 100;
  }

  // Gui thong tin dang ky tai khoan len server
  onSubmit(formRegister) {
  	// Kiem tra thong tin mat khau
    if (formRegister.value.password != formRegister.value.password1) {
      alert("Mật khẩu không đúng");
      formRegister.patchValue({
        password: '',
        password1: ''
      })
    }
    else {
      // url ket noi toi server
      const url = "http://localhost:3000/register";

      // header dinh dang du lieu gui
      const headers = new Headers({ 'Content-Type': 'application/json' });

      // body: du lieu gui den server xu ly
      const body = JSON.stringify({"name":formRegister.value.name,"username":formRegister.value.username,
        "password":formRegister.value.password,"address":formRegister.value.address,"mobile":formRegister.value.mobile,
        "email":formRegister.value.email,"image":formRegister.value.image, "acount_type": this.selectedType});
      // console.log(body);
      // console.log(this.selectedType);
      this.http.post(url, body, { headers: headers })
      .toPromise()
      .then(res => res.json())
      .then(resJson => {
        console.log("res: " + resJson);
        if (resJson.check == 0) {
          alert("Tên tài khoản bị trùng.");
        }
        else {
          console.log("RES: " + resJson);
          this.info = new Login(resJson.check, resJson.username, resJson.password, resJson.name, resJson.address, resJson.email, resJson.mobile, resJson.count_type);
          this.acountInfo.setInfomation(this.info);
          // sessionStorage.setItem('username', resJson.username);
          // sessionStorage.setItem('password', resJson.password);
          // sessionStorage.setItem('name', resJson.name);
          // sessionStorage.setItem('address', resJson.address);
          // sessionStorage.setItem('email', resJson.email);
          // sessionStorage.setItem('mobile', resJson.mobile);
          if (resJson.acount_type == "Nhà cung cấp" ) this.router.navigate(['/nhacungcap']);
          else this.router.navigate(['/sieuthi']);
          }
      })
    }
  }

}

function gmailValidator(formControl: FormControl) {
  if (formControl.value.includes("@gmail.com") || formControl.value.includes("@email.com")) {
    return null;
  }
  return {gmail: true};
}

class Login { 
  public check;
  public username;
  public password;
  public name;
  public address;
  public email;
  public mobile;
  public acount_type;
  constructor(check, username, password, name, address, email, mobile, acount_type) { 
    this.check = check;
    this.username = username;
    this.password = password;
    this.name = name;
    this.address = address;
    this.email = email;
    this.mobile = mobile;
    this.acount_type = acount_type;
  }
}