import { TestBed } from '@angular/core/testing';

import { GeologyService } from './geology.service';

describe('GeologyService', () => {
  let service: GeologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
