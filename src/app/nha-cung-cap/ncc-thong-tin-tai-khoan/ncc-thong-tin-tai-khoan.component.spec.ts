import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NccThongTinTaiKhoanComponent } from './ncc-thong-tin-tai-khoan.component';

describe('NccThongTinTaiKhoanComponent', () => {
  let component: NccThongTinTaiKhoanComponent;
  let fixture: ComponentFixture<NccThongTinTaiKhoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NccThongTinTaiKhoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NccThongTinTaiKhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
