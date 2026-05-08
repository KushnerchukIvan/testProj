import { TestBed } from '@angular/core/testing';

import { UnivercityService } from './univercity-service';

describe('UnivercityService', () => {
  let service: UnivercityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnivercityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
