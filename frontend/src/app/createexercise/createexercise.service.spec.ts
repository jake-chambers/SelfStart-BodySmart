import { TestBed, inject } from '@angular/core/testing';

import { CreateexerciseService } from './createexercise.service';

describe('CreateexerciseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateexerciseService]
    });
  });

  it('should be created', inject([CreateexerciseService], (service: CreateexerciseService) => {
    expect(service).toBeTruthy();
  }));
});
