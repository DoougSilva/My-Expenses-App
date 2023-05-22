import { TestBed } from '@angular/core/testing';

import { ExpensesGroupService } from './expenses-group.service';

describe('ExpensesGroupService', () => {
  let service: ExpensesGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
