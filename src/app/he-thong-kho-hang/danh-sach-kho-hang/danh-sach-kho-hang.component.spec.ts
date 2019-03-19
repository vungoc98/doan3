import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachKhoHangComponent } from './danh-sach-kho-hang.component';

describe('DanhSachKhoHangComponent', () => {
  let component: DanhSachKhoHangComponent;
  let fixture: ComponentFixture<DanhSachKhoHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachKhoHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachKhoHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
