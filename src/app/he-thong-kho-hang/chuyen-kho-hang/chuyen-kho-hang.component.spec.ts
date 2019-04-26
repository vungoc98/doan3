import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuyenKhoHangComponent } from './chuyen-kho-hang.component';

describe('ChuyenKhoHangComponent', () => {
  let component: ChuyenKhoHangComponent;
  let fixture: ComponentFixture<ChuyenKhoHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChuyenKhoHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChuyenKhoHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
