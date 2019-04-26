import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaoDienChungComponent } from './giao-dien-chung.component';

describe('GiaoDienChungComponent', () => {
  let component: GiaoDienChungComponent;
  let fixture: ComponentFixture<GiaoDienChungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaoDienChungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaoDienChungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
