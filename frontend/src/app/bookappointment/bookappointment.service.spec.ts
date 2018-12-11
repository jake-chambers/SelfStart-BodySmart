import { TestBed, inject } from '@angular/core/testing';

import { BookappointmentService } from './bookappointment.service';

describe('BookappointmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookappointmentService]
    });
  });

  it('should be created', inject([BookappointmentService], (service: BookappointmentService) => {
    expect(service).toBeTruthy();
  }));
});
