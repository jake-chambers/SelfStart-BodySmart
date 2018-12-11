import { TestBed, inject } from '@angular/core/testing';

import { CreatequestionService } from './createquestion.service';

describe('CreatequestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatequestionService]
    });
  });

  it('should be created', inject([CreatequestionService], (service: CreatequestionService) => {
    expect(service).toBeTruthy();
  }));
});
