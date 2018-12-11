import { TestBed, inject } from '@angular/core/testing';

import { AddquestionService } from './addquestion.service';

describe('AddquestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddquestionService]
    });
  });

  it('should be created', inject([AddquestionService], (service: AddquestionService) => {
    expect(service).toBeTruthy();
  }));
});
