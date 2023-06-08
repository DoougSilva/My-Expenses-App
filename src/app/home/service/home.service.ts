import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DatabaseService } from 'src/app/database/database.service';
import { ExpensesService } from 'src/app/expenses-group/expenses/service/expenses.service';
import { IncomeService } from 'src/app/income/service/income.service';

@Injectable({
  providedIn: 'root',
  deps: [DatabaseService, SQLite, IncomeService, ExpensesService]
})
export class HomeService {

  constructor(private dbService: DatabaseService, private incomeService: IncomeService, private expensesService: ExpensesService) { }

  public async getTotalValue() {
    let incomeValue = 0;
    let expensesValue = 0;
    incomeValue += await this.incomeService.sumValue().then((income) => { return income; });
    expensesValue += await this.expensesService.sumAllValue().then((expenses) => { return expenses; });
    return incomeValue - expensesValue;
  }

  public async getIncome() {
    let incomeValue = 0;
    incomeValue += await this.incomeService.sumValue().then((income) => { return income; });
    return incomeValue;
  }

  public async getExpenses() {
    let expensesValue = 0;
    expensesValue += await this.expensesService.sumAllValue().then((expenses) => { return expenses; });
    return expensesValue;
  }
}
