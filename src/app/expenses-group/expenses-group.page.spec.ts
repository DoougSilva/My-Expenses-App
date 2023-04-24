import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesGroupPage } from './expenses-group.page';

describe('ExpensesGroupPage', () => {
  let component: ExpensesGroupPage;
  let fixture: ComponentFixture<ExpensesGroupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExpensesGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
