import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhaPhanPhoiComponent } from './nha-phan-phoi.component';

describe('NhaPhanPhoiComponent', () => {
  let component: NhaPhanPhoiComponent;
  let fixture: ComponentFixture<NhaPhanPhoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhaPhanPhoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhaPhanPhoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
