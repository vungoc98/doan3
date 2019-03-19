import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongKeKhoHangComponent } from './thong-ke-kho-hang.component';

describe('ThongKeKhoHangComponent', () => {
  let component: ThongKeKhoHangComponent;
  let fixture: ComponentFixture<ThongKeKhoHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongKeKhoHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongKeKhoHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
