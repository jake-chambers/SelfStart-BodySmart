import { TestBed, inject } from '@angular/core/testing';

import { ManageexercisesService } from './manageexercises.service';

describe('ManageexercisesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageexercisesService]
    });
  });

  it('should be created', inject([ManageexercisesService], (service: ManageexercisesService) => {
    expect(service).toBeTruthy();
  }));
});
