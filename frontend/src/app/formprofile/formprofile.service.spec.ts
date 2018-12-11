import { TestBed, inject } from '@angular/core/testing';

import { FormprofileService } from './formprofile.service';

describe('FormprofileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormprofileService]
    });
  });

  it('should be created', inject([FormprofileService], (service: FormprofileService) => {
    expect(service).toBeTruthy();
  }));
});
