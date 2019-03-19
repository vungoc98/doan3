import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoDonNhapHangComponent } from './tao-don-nhap-hang.component';

describe('TaoDonNhapHangComponent', () => {
  let component: TaoDonNhapHangComponent;
  let fixture: ComponentFixture<TaoDonNhapHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaoDonNhapHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoDonNhapHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
