import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachNhomNguoiDungComponent } from './danh-sach-nhom-nguoi-dung.component';

describe('DanhSachNhomNguoiDungComponent', () => {
  let component: DanhSachNhomNguoiDungComponent;
  let fixture: ComponentFixture<DanhSachNhomNguoiDungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachNhomNguoiDungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachNhomNguoiDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
