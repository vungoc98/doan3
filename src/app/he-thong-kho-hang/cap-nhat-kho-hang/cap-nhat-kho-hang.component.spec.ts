import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatKhoHangComponent } from './cap-nhat-kho-hang.component';

describe('CapNhatKhoHangComponent', () => {
  let component: CapNhatKhoHangComponent;
  let fixture: ComponentFixture<CapNhatKhoHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapNhatKhoHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapNhatKhoHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
