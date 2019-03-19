import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LichSuKhoHangComponent } from './lich-su-kho-hang.component';

describe('LichSuKhoHangComponent', () => {
  let component: LichSuKhoHangComponent;
  let fixture: ComponentFixture<LichSuKhoHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichSuKhoHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichSuKhoHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
