import { Component, OnInit } from '@angular/core'; 
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-thong-ke',
  templateUrl: './thong-ke.component.html',
  styleUrls: ['./thong-ke.component.css']
})
export class ThongKeComponent implements OnInit {
  
  // Thong ke toan bo kho hang
  amount_import; // so luong nhap
  amount_export; // so luong xuat
  amount_manufacturing; // so luong con han
  amount_expiry; // so luong het han
  products = new Array(); // mang cac san pham con lai trong kho
  constructor(private http: Http, private router: Router) { }

  ngOnInit() { 
    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 

  	const url = "http://localhost:3000/thongketoanbo";
  	const headers = new Headers({ 'Content-Type': 'application/json' }); 
  	this.http.get(url, {headers: headers})
  	.toPromise()
  	.then(res => res.json())
  	.then(resJson => {
  		console.log("hien thi");
  		this.amount_import = resJson.amount_import; 
        this.amount_export = resJson.amount_export;
        this.amount_manufacturing = resJson.amount_manufacturing;
        this.amount_expiry = resJson.amount_expiry;
        this.products = resJson.products; 

  	})
  }

}
