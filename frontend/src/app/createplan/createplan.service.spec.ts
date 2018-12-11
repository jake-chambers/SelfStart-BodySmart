import { TestBed, inject } from '@angular/core/testing';

import { CreateplanService } from './createplan.service';

describe('CreateplanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateplanService]
    });
  });

  it('should be created', inject([CreateplanService], (service: CreateplanService) => {
    expect(service).toBeTruthy();
  }));
});
