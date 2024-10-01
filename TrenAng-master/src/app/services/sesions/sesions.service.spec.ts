import { TestBed } from '@angular/core/testing';

import { SesionsService } from './sesions.service';

describe('SesionsService', () => {
  let service: SesionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
