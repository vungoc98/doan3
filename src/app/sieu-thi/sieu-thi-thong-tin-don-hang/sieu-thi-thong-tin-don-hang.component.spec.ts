import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SieuThiThongTinDonHangComponent } from './sieu-thi-thong-tin-don-hang.component';

describe('SieuThiThongTinDonHangComponent', () => {
  let component: SieuThiThongTinDonHangComponent;
  let fixture: ComponentFixture<SieuThiThongTinDonHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SieuThiThongTinDonHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SieuThiThongTinDonHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
