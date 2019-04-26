import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SieuThiQuanLyDonHangComponent } from './sieu-thi-quan-ly-don-hang.component';

describe('SieuThiQuanLyDonHangComponent', () => {
  let component: SieuThiQuanLyDonHangComponent;
  let fixture: ComponentFixture<SieuThiQuanLyDonHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SieuThiQuanLyDonHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SieuThiQuanLyDonHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
