import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietKhoHangComponent } from './chi-tiet-kho-hang.component';

describe('ChiTietKhoHangComponent', () => {
  let component: ChiTietKhoHangComponent;
  let fixture: ComponentFixture<ChiTietKhoHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietKhoHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietKhoHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
