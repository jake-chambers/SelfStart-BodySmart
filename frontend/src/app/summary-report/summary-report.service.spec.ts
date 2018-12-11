import { TestBed, inject } from '@angular/core/testing';

import { SummaryReportService } from './summary-report.service';

describe('SummaryReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SummaryReportService]
    });
  });

  it('should be created', inject([SummaryReportService], (service: SummaryReportService) => {
    expect(service).toBeTruthy();
  }));
});
