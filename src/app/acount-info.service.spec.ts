import { TestBed } from '@angular/core/testing';

import { AcountInfoService } from './acount-info.service';

describe('AcountInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcountInfoService = TestBed.get(AcountInfoService);
    expect(service).toBeTruthy();
  });
});
