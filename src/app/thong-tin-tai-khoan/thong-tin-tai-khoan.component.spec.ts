import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinTaiKhoanComponent } from './thong-tin-tai-khoan.component';

describe('ThongTinTaiKhoanComponent', () => {
  let component: ThongTinTaiKhoanComponent;
  let fixture: ComponentFixture<ThongTinTaiKhoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongTinTaiKhoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongTinTaiKhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
