import { TestBed } from '@angular/core/testing';

import { CoronaapiService } from './coronaapi.service';

describe('CoronaapiService', () => {
  let service: CoronaapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoronaapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
