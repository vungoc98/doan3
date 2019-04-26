import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NccQuanLyDonHangComponent } from './ncc-quan-ly-don-hang.component';

describe('NccQuanLyDonHangComponent', () => {
  let component: NccQuanLyDonHangComponent;
  let fixture: ComponentFixture<NccQuanLyDonHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NccQuanLyDonHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NccQuanLyDonHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
