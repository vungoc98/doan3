import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoMoiSanPhamComponent } from './tao-moi-san-pham.component';

describe('TaoMoiSanPhamComponent', () => {
  let component: TaoMoiSanPhamComponent;
  let fixture: ComponentFixture<TaoMoiSanPhamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaoMoiSanPhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoMoiSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
