import { TestBed, inject } from '@angular/core/testing';

import { ManageusersService } from './manageusers.service';

describe('ManageusersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageusersService]
    });
  });

  it('should be created', inject([ManageusersService], (service: ManageusersService) => {
    expect(service).toBeTruthy();
  }));
});
