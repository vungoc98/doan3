import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachHangHoaComponent } from './danh-sach-hang-hoa.component';

describe('DanhSachHangHoaComponent', () => {
  let component: DanhSachHangHoaComponent;
  let fixture: ComponentFixture<DanhSachHangHoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachHangHoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachHangHoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
