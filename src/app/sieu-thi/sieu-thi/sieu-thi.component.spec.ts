import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SieuThiComponent } from './sieu-thi.component';

describe('SieuThiComponent', () => {
  let component: SieuThiComponent;
  let fixture: ComponentFixture<SieuThiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SieuThiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SieuThiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
