import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoMoiKhoHangComponent } from './tao-moi-kho-hang.component';

describe('TaoMoiKhoHangComponent', () => {
  let component: TaoMoiKhoHangComponent;
  let fixture: ComponentFixture<TaoMoiKhoHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaoMoiKhoHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoMoiKhoHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
