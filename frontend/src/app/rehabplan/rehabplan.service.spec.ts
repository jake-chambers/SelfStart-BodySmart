import { TestBed, inject } from '@angular/core/testing';

import { RehabplanService } from './rehabplan.service';

describe('RehabplanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RehabplanService]
    });
  });

  it('should be created', inject([RehabplanService], (service: RehabplanService) => {
    expect(service).toBeTruthy();
  }));
});
