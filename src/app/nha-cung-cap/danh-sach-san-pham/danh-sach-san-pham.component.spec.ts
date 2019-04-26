import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachSanPhamComponent } from './danh-sach-san-pham.component';

describe('DanhSachSanPhamComponent', () => {
  let component: DanhSachSanPhamComponent;
  let fixture: ComponentFixture<DanhSachSanPhamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachSanPhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
