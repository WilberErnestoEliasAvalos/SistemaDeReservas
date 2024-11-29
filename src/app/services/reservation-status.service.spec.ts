import { TestBed } from '@angular/core/testing';

import { ReservationStatusService } from './reservation-status.service';

describe('ReservationStatusService', () => {
  let service: ReservationStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
