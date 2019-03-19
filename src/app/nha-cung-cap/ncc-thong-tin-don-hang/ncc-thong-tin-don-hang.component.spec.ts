import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NccThongTinDonHangComponent } from './ncc-thong-tin-don-hang.component';

describe('NccThongTinDonHangComponent', () => {
  let component: NccThongTinDonHangComponent;
  let fixture: ComponentFixture<NccThongTinDonHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NccThongTinDonHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NccThongTinDonHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
