import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatNhomHangHoaComponent } from './cap-nhat-nhom-hang-hoa.component';

describe('CapNhatNhomHangHoaComponent', () => {
  let component: CapNhatNhomHangHoaComponent;
  let fixture: ComponentFixture<CapNhatNhomHangHoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapNhatNhomHangHoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapNhatNhomHangHoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
