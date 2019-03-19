import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-chi-tiet-don-hang',
  templateUrl: './chi-tiet-don-hang.component.html',
  styleUrls: ['./chi-tiet-don-hang.component.css']
})

export class ChiTietDonHangComponent implements OnInit {

  @Input() type_account: string;
  id: string; //
  private donNhapHang: boolean;
  private donDatHang: boolean;
  order_type: string; // Loai don hang (don nhap hang hay don dat hang)

  // Thong tin don hang:
  order_code: string; // Ma don hang
  amount_total; // Tong so luong
  price_total; // Tong tien
  order_date; // Ngay tao don
  import_date; // Ngay nhap
  status; // Trang thai

  // Thong tin nha cung cap - sieu thi
  name; 
  code;
  address;
  mobile;
  email;

  // Danh sach hang hoa cua don hang
  products = new Array();
  constructor(private route: ActivatedRoute, private http: Http) { }

  ngOnInit() { 
    // Quan ly don hang trong giao dien nha cung cap
    if (this.type_account == "ncc") {
      this.donNhapHang = true;
      this.donDatHang = false;
    }

    // Quan ly don hang trong giao dien sieu thi
    else if (this.type_account == "sieuthi") {
      this.donNhapHang = false;
      this.donDatHang = true;
    }

    // Quan ly don hang trong giao dien nha phan phoi
  	this.route.paramMap.subscribe((params: ParamMap) => {
  		this.id = params.get("id");
      this.order_type = params.get("name"); 
      if (this.order_type == "donnhaphang") {
        this.donNhapHang = true;
        this.donDatHang = false; 
        this.type_account ="npp";
      }
      else if (this.order_type == "dondathang") {
        this.donNhapHang = false;
        this.donDatHang = true;
        this.type_account = "npp";
      }
  	})

    // Lay thong tin don hang va thong tin nha cung cap
    var url = "http://localhost:3000/getOrderInfoById";
    var headers = new Headers({'Content-Type': 'application/json'});
    var body = JSON.stringify({'id': this.id, 'order_name': this.order_type});
    this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      this.order_code = resJson[0].order_code;
      this.amount_total = resJson[0].amount_total;
      this.price_total = resJson[0].price_total;
      this.order_date = resJson[0].order_date;
      this.import_date = resJson[0].import_date;
      this.status = resJson[0].status;
      this.name = resJson[0].name;
      this.code = resJson[0].code;
      this.address = resJson[0].address;
      this.mobile = resJson[0].mobile;
      this.email = resJson[0].email; 
    })

    // Lay danh sach hang hoa cua don hang
    url = "http://localhost:3000/getOrderProducts";
    this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      for (var i = 0; i < resJson.length; i++) {
        this.products[i] = resJson[i];
      }
    })
  }

}
