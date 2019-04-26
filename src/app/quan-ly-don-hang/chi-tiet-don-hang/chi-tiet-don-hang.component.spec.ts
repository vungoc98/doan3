import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietDonHangComponent } from './chi-tiet-don-hang.component';

describe('ChiTietDonHangComponent', () => {
  let component: ChiTietDonHangComponent;
  let fixture: ComponentFixture<ChiTietDonHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietDonHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietDonHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
