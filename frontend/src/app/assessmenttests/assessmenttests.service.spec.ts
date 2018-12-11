import { TestBed, inject } from '@angular/core/testing';

import { AssessmenttestsService } from './assessmenttests.service';

describe('AssessmenttestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssessmenttestsService]
    });
  });

  it('should be created', inject([AssessmenttestsService], (service: AssessmenttestsService) => {
    expect(service).toBeTruthy();
  }));
});
