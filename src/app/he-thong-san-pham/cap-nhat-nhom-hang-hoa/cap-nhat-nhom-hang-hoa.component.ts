import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-cap-nhat-nhom-hang-hoa',
  templateUrl: './cap-nhat-nhom-hang-hoa.component.html',
  styleUrls: ['./cap-nhat-nhom-hang-hoa.component.css']
})
export class CapNhatNhomHangHoaComponent implements OnInit {
  
  formUpdateGroupProduct: FormGroup;
  name1; // name cua nhom san pham can cap nhat thong tin
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: Http,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.formUpdateGroupProduct = this.fb.group({
      name: '',
      description:  ''
      }); 
    this.route.paramMap.subscribe((params: ParamMap) =>{
      this.name1 = params.get('name');
      this.name1.replace("%20", " ");
      console.log(this.name1);
    })

    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 
    
    // Tim thong tin san pham co id = this.id de gan gia tri cho form
    const url = "http://localhost:3000/getProductCategoryInfo";
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ 'name': this.name1 });
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => { 
      this.formUpdateGroupProduct.setValue({
      name: resJson[0].name,
      description: resJson[0].description
      }); 
    }) 
  }

   // Cap nhat thong tin nhom san pham
  onSubmit(formUpdateGroupProduct) {
    const url = "http://localhost:3000/updateProduct_Category";
    const headers = new Headers( { 'Content-Type': 'application/json' });
    const body = JSON.stringify(formUpdateGroupProduct.value);
    this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.text())
    .then(resText => {
      /*
       * Neu thanh cong (resText = 1) chuyen huong den trang he thong nhom san pham
       * Neu resText = 0 => hien thong bao loi
       */
       if (resText == "1") {
         this.router.navigateByUrl('/hethongsanpham/hethongnhomsanpham');
       }
       else {
         alert("Error");
       }
    })
  }
}
