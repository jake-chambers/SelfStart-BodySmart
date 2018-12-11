import { TestBed, inject } from '@angular/core/testing';

import { QuestionformService } from './questionform.service';

describe('QuestionformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionformService]
    });
  });

  it('should be created', inject([QuestionformService], (service: QuestionformService) => {
    expect(service).toBeTruthy();
  }));
});
