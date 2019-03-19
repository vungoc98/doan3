import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinhTrangKhoHangComponent } from './tinh-trang-kho-hang.component';

describe('TinhTrangKhoHangComponent', () => {
  let component: TinhTrangKhoHangComponent;
  let fixture: ComponentFixture<TinhTrangKhoHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinhTrangKhoHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinhTrangKhoHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
