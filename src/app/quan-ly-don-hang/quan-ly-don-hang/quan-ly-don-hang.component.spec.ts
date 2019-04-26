import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyDonHangComponent } from './quan-ly-don-hang.component';

describe('QuanLyDonHangComponent', () => {
  let component: QuanLyDonHangComponent;
  let fixture: ComponentFixture<QuanLyDonHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyDonHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyDonHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
