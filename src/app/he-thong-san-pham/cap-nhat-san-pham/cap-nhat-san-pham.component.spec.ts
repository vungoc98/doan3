import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatSanPhamComponent } from './cap-nhat-san-pham.component';

describe('CapNhatSanPhamComponent', () => {
  let component: CapNhatSanPhamComponent;
  let fixture: ComponentFixture<CapNhatSanPhamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapNhatSanPhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapNhatSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
