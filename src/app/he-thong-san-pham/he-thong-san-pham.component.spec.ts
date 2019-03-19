import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeThongSanPhamComponent } from './he-thong-san-pham.component';

describe('HeThongSanPhamComponent', () => {
  let component: HeThongSanPhamComponent;
  let fixture: ComponentFixture<HeThongSanPhamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeThongSanPhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeThongSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
