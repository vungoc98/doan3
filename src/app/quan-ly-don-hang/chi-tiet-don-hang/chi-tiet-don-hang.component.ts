import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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

  // Hien thi modal huy don hang
  modalRef: BsModalRef;

  // Ly do huy don hang
  reason = '';

  // xuat hang
  array_object_container_products = new Array(); // Mang chua cac container-cac san pham tuong ung trong container co trong don hang

  vidu = [1, 2, 3, 4];
  constructor(private modalService: BsModalService, private route: ActivatedRoute, private http: Http, private router: Router) { }

  ngOnInit() {

    // Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 

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
      this.products = resJson;
    })
  }

  // Khi nhan vao button 'Xác nhận' => xac nhan don hang 
  xacNhanDonHang() {
    var url = "http://localhost:3000/confirmOrderId";
    var headers = new Headers({'Content-Type': 'application/json'});
    var body = JSON.stringify({'id': this.id});
    this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => { 
      if (resJson == '1')
        this.status = 'Chờ thanh toán';
      else alert('Error!');
    }) 
  }

  // Modal Huy don hang
  openModalHuyDonHang(huydon: TemplateRef<any>) {
    this.modalRef = this.modalService.show(huydon);
  }

  // Xac nhan huy don
  async huyDon() {
    var url = "http://localhost:3000/cancelOrderId";
    var headers = new Headers({'Content-Type': 'application/json'});
    var body = JSON.stringify({'id': this.id, 'reason': this.reason.trim()});
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => { 
      if (resJson == '1')
        this.status = 'Bị hủy';
      else alert('Error!');
    }) 
    this.modalRef.hide();
  }

  // Khi nhan vao button 'Xuất hàng' => Hien thi modal de chon kho hang can xuat
  async openModalXuatHang(xuathang: TemplateRef<any>) {
    var url = "http://localhost:3000/exportOrderId";
    var headers = new Headers({'Content-Type': 'application/json'});
    var body = JSON.stringify({'id': this.id});
    await this.http.post(url, body, { headers: headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => { 
      this.array_object_container_products = resJson; 
    })  
    this.modalRef = this.modalService.show(xuathang);  
  }

  // Chon kho hang de xuat hang cho don hang
  // index: Chi so cua mang array_object_container_products
  chonKhoXuatHang(index) {
    var i = 0;
    if (this.array_object_container_products[index].products.length != this.products.length) {
       alert("Số lượng hàng hóa trong kho hiện không đủ để xuất hàng.");
       return;
    }
    for(i = 0; i < this.array_object_container_products[index].products.length; i++) {
      if (this.array_object_container_products[index].products[i].soluongconhan < this.array_object_container_products[index].products[i].soluongnhap) {
        alert("Số lượng hàng hóa trong kho hiện không đủ để xuất hàng.");
        break;
      }
    }
    if (this.array_object_container_products[index].products.length == i) { 
      var url = "http://localhost:3000/chooseContainerExport";
      var headers = new Headers( { 'Content-Type': 'application/json' });
      var body = JSON.stringify( { 'order_id': this.id, 'container_id': this.array_object_container_products[index].container.id, 'order_products': this.products } );
      this.http.post(url, body, { headers: headers })
      .toPromise()
      .then(res => res.json())
      .then(resJson => {
        if (resJson == '1') {
          this.modalRef.hide();
          this.router.navigateByUrl("/quanlydonhang/dondathang/xemchitiet/" + this.id);
          location.reload();
        }
        else alert("Error!");
      })
    }
  }

  closeModal() {
    this.reason = ''; 
    this.modalRef.hide(); 
  }

}
