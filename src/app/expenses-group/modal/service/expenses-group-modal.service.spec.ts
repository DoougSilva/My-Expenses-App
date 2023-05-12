import { TestBed } from '@angular/core/testing';

import { ExpensesGroupModalService } from './expenses-group-modal.service';

describe('ExpensesGroupModalService', () => {
  let service: ExpensesGroupModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesGroupModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
