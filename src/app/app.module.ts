import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// service
import { AcountInfoService } from './acount-info.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeThongSanPhamComponent } from './he-thong-san-pham/he-thong-san-pham.component';
import { NhaPhanPhoiComponent } from './nha-phan-phoi/nha-phan-phoi.component';
import { HeaderNPPComponent } from './header-npp.component';
import { NPPComponent } from './npp.component';
import { TaoMoiSanPhamComponent } from './he-thong-san-pham/tao-moi-san-pham/tao-moi-san-pham.component';
import { DanhSachHangHoaComponent } from './he-thong-san-pham/danh-sach-hang-hoa/danh-sach-hang-hoa.component';
import { CapNhatSanPhamComponent } from './he-thong-san-pham/cap-nhat-san-pham/cap-nhat-san-pham.component';
import { DanhSachNhomHangHoaComponent } from './he-thong-san-pham/danh-sach-nhom-hang-hoa/danh-sach-nhom-hang-hoa.component';
import { CapNhatNhomHangHoaComponent } from './he-thong-san-pham/cap-nhat-nhom-hang-hoa/cap-nhat-nhom-hang-hoa.component';
import { TaoMoiKhoHangComponent } from './he-thong-kho-hang/tao-moi-kho-hang/tao-moi-kho-hang.component';
import { DanhSachKhoHangComponent } from './he-thong-kho-hang/danh-sach-kho-hang/danh-sach-kho-hang.component';
import { CapNhatKhoHangComponent } from './he-thong-kho-hang/cap-nhat-kho-hang/cap-nhat-kho-hang.component';
import { MenuChiTietKhoHangComponent } from './menu-chi-tiet-kho-hang.component';
import { ChiTietKhoHangComponent } from './he-thong-kho-hang/chi-tiet-kho-hang/chi-tiet-kho-hang.component';
import { ThongTinCoBanKhoHangComponent } from './he-thong-kho-hang/thong-tin-co-ban-kho-hang/thong-tin-co-ban-kho-hang.component';
import { TinhTrangKhoHangComponent } from './he-thong-kho-hang/tinh-trang-kho-hang/tinh-trang-kho-hang.component';
import { ChuyenKhoHangComponent } from './he-thong-kho-hang/chuyen-kho-hang/chuyen-kho-hang.component';
import { LichSuKhoHangComponent } from './he-thong-kho-hang/lich-su-kho-hang/lich-su-kho-hang.component';
import { ThongKeKhoHangComponent } from './he-thong-kho-hang/thong-ke-kho-hang/thong-ke-kho-hang.component';
import { ThongKeComponent } from './he-thong-kho-hang/thong-ke/thong-ke.component';
import { TaoDonNhapHangComponent } from './quan-ly-don-hang/tao-don-nhap-hang/tao-don-nhap-hang.component';
import { QuanLyDonHangComponent } from './quan-ly-don-hang/quan-ly-don-hang/quan-ly-don-hang.component';
import { ChiTietDonHangComponent } from './quan-ly-don-hang/chi-tiet-don-hang/chi-tiet-don-hang.component';
import { DanhSachNhomNguoiDungComponent } from './quan-ly-nguoi-dung/danh-sach-nhom-nguoi-dung/danh-sach-nhom-nguoi-dung.component';
import { ThongTinTaiKhoanComponent } from './thong-tin-tai-khoan/thong-tin-tai-khoan.component';
import { SignInComponent } from './nha-cung-cap/sign-in/sign-in.component';
import { GiaoDienChungComponent } from './nha-cung-cap/giao-dien-chung/giao-dien-chung.component';
import { DanhSachSanPhamComponent } from './nha-cung-cap/danh-sach-san-pham/danh-sach-san-pham.component';
import { ThemSanPhamComponent } from './nha-cung-cap/them-san-pham/them-san-pham.component';
import { NccQuanLyDonHangComponent } from './nha-cung-cap/ncc-quan-ly-don-hang/ncc-quan-ly-don-hang.component';
import { NccThongTinDonHangComponent } from './nha-cung-cap/ncc-thong-tin-don-hang/ncc-thong-tin-don-hang.component';
import { NccThongTinTaiKhoanComponent } from './nha-cung-cap/ncc-thong-tin-tai-khoan/ncc-thong-tin-tai-khoan.component';
import { SieuThiComponent } from './sieu-thi/sieu-thi/sieu-thi.component';
import { SieuThiGiaoDienChungComponent } from './sieu-thi/sieu-thi-giao-dien-chung/sieu-thi-giao-dien-chung.component';
import { DatHangComponent } from './sieu-thi/dat-hang/dat-hang.component';
import { SieuThiQuanLyDonHangComponent } from './sieu-thi/sieu-thi-quan-ly-don-hang/sieu-thi-quan-ly-don-hang.component';
import { SieuThiThongTinDonHangComponent } from './sieu-thi/sieu-thi-thong-tin-don-hang/sieu-thi-thong-tin-don-hang.component';

// class
//import { Product } from './he-thong-san-pham/danh-sach-hang-hoa/class-hang-hoa';

const routesConfig: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // nha phan phoi
  { path: 'nhaphanphoi', component: NhaPhanPhoiComponent },
  { path: 'hethongsanpham', component: HeThongSanPhamComponent },
  { path: 'hethongsanpham/taomoisanpham', component: TaoMoiSanPhamComponent },
  { path: 'hethongsanpham/danhsachsanpham', component: DanhSachHangHoaComponent },
  { path: 'hethongsanpham/danhsachsanpham/capnhatsanpham/:id', component: CapNhatSanPhamComponent },
  { path: 'hethongsanpham/hethongnhomsanpham', component: DanhSachNhomHangHoaComponent },
  { path: 'hethongsanpham/hethongnhomsanpham/capnhatnhomsanpham/:name', component: CapNhatNhomHangHoaComponent},
  { path: 'hethongkhohang/taomoikhohang', component: TaoMoiKhoHangComponent },
  { path: 'hethongkhohang/danhsachkhohang', component: DanhSachKhoHangComponent },
  { path: 'hethongkhohang/danhsachkhohang/chitietkhohang/:id', component: ChiTietKhoHangComponent },
  { path: 'hethongkhohang/danhsachkhohang/chitietkhohang/:id/thongtincoban', component: ThongTinCoBanKhoHangComponent },
  { path: 'hethongkhohang/danhsachkhohang/chitietkhohang/:id/tinhtrangkhohang', component: TinhTrangKhoHangComponent },
  { path: 'hethongkhohang/danhsachkhohang/chitietkhohang/:id/tinhtrangkhohang/:code', component: ChuyenKhoHangComponent },
  { path: 'hethongkhohang/danhsachkhohang/chitietkhohang/:id/lichsukhohang', component: LichSuKhoHangComponent },
  { path: 'hethongkhohang/danhsachkhohang/chitietkhohang/:id/thongkekhohang', component: ThongKeKhoHangComponent },
  { path: 'hethongkhohang/thongke', component: ThongKeComponent },
  { path: 'quanlydonhang/taodonnhaphang', component: TaoDonNhapHangComponent },
  { path: 'quanlydonhang/nhap_hang_dat_hang', component: QuanLyDonHangComponent },
  { path: 'quanlydonhang/:name/xemchitiet/:id', component: ChiTietDonHangComponent },
  { path: 'quanlynguoidung', component: DanhSachNhomNguoiDungComponent },
  { path: 'thongtintaikhoan/:name', component: ThongTinTaiKhoanComponent }, 
  // Nha cung cap
  { path: 'nhacungcap', component: GiaoDienChungComponent },
  { path: 'nhacungcap/danhsachsanpham', component: DanhSachSanPhamComponent },
  { path: 'nhacungcap/quanlydonhang', component: NccQuanLyDonHangComponent },
  { path: 'nhacungcap/quanlydonhang/xemchitiet/:id', component: NccThongTinDonHangComponent },
  { path: 'nhacungcap/danhsachsanpham/themsanpham', component: ThemSanPhamComponent },

  // Sieu thi
  { path: 'sieuthi', component: SieuThiGiaoDienChungComponent },
  { path: 'sieuthi/dathang', component: DatHangComponent },
  { path: 'sieuthi/quanlydonhang', component: SieuThiQuanLyDonHangComponent},
  { path: 'sieuthi/quanlydonhang/xemchitiet/:id', component: SieuThiThongTinDonHangComponent },

  // // cac path con lai
  // { path: "**", redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeThongSanPhamComponent,
    NhaPhanPhoiComponent,
    HeaderNPPComponent,
    NPPComponent,
    TaoMoiSanPhamComponent,
    DanhSachHangHoaComponent,
    CapNhatSanPhamComponent,
    DanhSachNhomHangHoaComponent,
    TaoMoiKhoHangComponent,
    CapNhatNhomHangHoaComponent,
    DanhSachKhoHangComponent,
    CapNhatKhoHangComponent,
    MenuChiTietKhoHangComponent,
    ChiTietKhoHangComponent,
    ThongTinCoBanKhoHangComponent,
    TinhTrangKhoHangComponent,
    ChuyenKhoHangComponent,
    LichSuKhoHangComponent,
    ThongKeKhoHangComponent,
    ThongKeComponent,
    TaoDonNhapHangComponent,
    QuanLyDonHangComponent,
    ChiTietDonHangComponent,
    DanhSachNhomNguoiDungComponent,
    ThongTinTaiKhoanComponent,
    SignInComponent,
    GiaoDienChungComponent,
    DanhSachSanPhamComponent,
    ThemSanPhamComponent,
    NccQuanLyDonHangComponent,
    NccThongTinDonHangComponent,
    NccThongTinTaiKhoanComponent,
    SieuThiComponent,
    SieuThiGiaoDienChungComponent,
    DatHangComponent,
    SieuThiQuanLyDonHangComponent,
    SieuThiThongTinDonHangComponent,
    
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule
    RouterModule.forRoot(routesConfig,{onSameUrlNavigation: 'reload'}),
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    HttpModule,
     
  ],
  providers: [AcountInfoService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
