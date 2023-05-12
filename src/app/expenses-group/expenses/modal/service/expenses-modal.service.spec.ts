import { TestBed } from '@angular/core/testing';

import { ExpensesModalService } from './expenses-modal.service';

describe('ExpensesModalService', () => {
  let service: ExpensesModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
