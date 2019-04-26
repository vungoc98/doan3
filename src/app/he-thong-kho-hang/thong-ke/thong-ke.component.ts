import { Component, OnInit } from '@angular/core'; 
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'

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
  total_page;// tong so trang
  page; // Chi so trang
  display_pages: boolean = false; // Co hien trang hay khong 
  current_page = 1; // Set active cho cac page
  number = 5;
  display_products = []; // Chua san pham hien thi tung trang, moi trang hien thi number san pham
  constructor(private http: Http, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() { 
    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 

  	const url = "http://localhost:3000/thongketoanbo";
  	const headers = new Headers({ 'Content-Type': 'application/json' }); 
    // Lay thong tin ve toan bo cac kho hang
  	await this.http.get(url, {headers: headers})
  	.toPromise()
  	.then(res => res.json())
  	.then(resJson => {
  		console.log("hien thi");
  		this.amount_import = resJson.amount_import; 
        this.amount_export = resJson.amount_export;
        this.amount_manufacturing = resJson.amount_manufacturing;
        this.amount_expiry = resJson.amount_expiry;
        this.products = resJson.products; 
        if (this.amount_export < 0) this.amount_export = 0;
  	})

    // Kiem tra so luong products co du lon de hien thi trang
    if (this.products.length > this.number) this.display_pages = true;
     // Lay so trang
    this.route.queryParams.subscribe((params: ParamMap) => {
      this.page = params['page'];  
    }) 

    // Kiem tra nguoi dung co bam chon trang khac trang 1 ( tu 2 den ...)
    if (this.page != undefined) {  
      var k = 0;
      for (var i = (this.page - 1) * this.number; i < (this.page * this.number) && i < this.products.length; i++) {
        this.display_products[k] = this.products[i];
        k++;
      }

      // set active cho trang hien tai
      this.current_page = this.page;
    }
    else {
      for (var i = 0; i < this.number && i < this.products.length; i++) {
        this.display_products[i] = this.products[i];
      }
    }
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
    this.display_products.splice(0, this.display_products.length);
    if (page == 1) { 
      this.router.navigateByUrl('/hethongkhohang/thongke'); 
      for (var i = 0; i < this.number; i++) {
        this.display_products[i] = this.products[i];
      } 
    }
    else { 
      this.router.navigate(['/hethongkhohang/thongke'], {queryParams: {page: page}}); 
      var k = 0;
      for (var i = (page - 1) * this.number; i < (page * this.number) && i < this.products.length; i++) {
        this.display_products[k] = this.products[i];
        k++;
      }  
    }
  }
}
