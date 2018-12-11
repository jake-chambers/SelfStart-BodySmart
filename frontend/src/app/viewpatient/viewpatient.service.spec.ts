import { TestBed, inject } from '@angular/core/testing';

import { ViewpatientService } from './viewpatient.service';

describe('ViewpatientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewpatientService]
    });
  });

  it('should be created', inject([ViewpatientService], (service: ViewpatientService) => {
    expect(service).toBeTruthy();
  }));
});
