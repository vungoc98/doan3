import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachNhomHangHoaComponent } from './danh-sach-nhom-hang-hoa.component';

describe('DanhSachNhomHangHoaComponent', () => {
  let component: DanhSachNhomHangHoaComponent;
  let fixture: ComponentFixture<DanhSachNhomHangHoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachNhomHangHoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachNhomHangHoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
