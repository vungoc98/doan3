import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SieuThiGiaoDienChungComponent } from './sieu-thi-giao-dien-chung.component';

describe('SieuThiGiaoDienChungComponent', () => {
  let component: SieuThiGiaoDienChungComponent;
  let fixture: ComponentFixture<SieuThiGiaoDienChungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SieuThiGiaoDienChungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SieuThiGiaoDienChungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
