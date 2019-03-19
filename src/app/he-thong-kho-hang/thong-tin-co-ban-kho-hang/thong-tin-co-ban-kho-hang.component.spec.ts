import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinCoBanKhoHangComponent } from './thong-tin-co-ban-kho-hang.component';

describe('ThongTinCoBanKhoHangComponent', () => {
  let component: ThongTinCoBanKhoHangComponent;
  let fixture: ComponentFixture<ThongTinCoBanKhoHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongTinCoBanKhoHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongTinCoBanKhoHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
