import { TestBed } from '@angular/core/testing';

import { IncomeModalService } from './income-modal.service';

describe('IncomeModalService', () => {
  let service: IncomeModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
