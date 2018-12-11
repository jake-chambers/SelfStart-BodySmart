import { TestBed, inject } from '@angular/core/testing';

import { MakepaymentService } from './makepayment.service';

describe('MakepaymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MakepaymentService]
    });
  });

  it('should be created', inject([MakepaymentService], (service: MakepaymentService) => {
    expect(service).toBeTruthy();
  }));
});
