import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/database/database.service';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { IExpenses } from '../model/expenses.interface';

@Injectable({
  providedIn: 'root',
  deps: [DatabaseService, SQLite]

})
export class ExpensesService {

  constructor(private dbService: DatabaseService) { }

  public insert(expenses: IExpenses):void {
    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'INSERT INTO expenses (_name, _description, _value, _expiry, _buy, expense_group_id) values (?, ?, ?, ?, ?, ?)';
      let data = [expenses.name, expenses.description, expenses.value, expenses.expiry, expenses.buy, expenses.expensesGroupId];
      db.executeSql(sql, data)
      .then(() => console.log('expenses saved'))
      .catch((e: any) => console.error(e));
    })
    .catch((e: any) => {
      console.error(e);
    });
  }

  public revome(id: number ):void {
    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'DELETE FROM expenses WHERE id = ?';
      let data = [id];
      db.executeSql(sql, data)
      .then(() => console.log('expenses deleted'))
      .catch((e: any) => console.error(e));
    })
    .catch((e: any) => {
      console.error(e);
    });
  }

  public async getAll(id: number) {
    let expenses = new Array<IExpenses>();
    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT * FROM expenses WHERE expense_group_id = ?';
      let data: any[] = [id];
      db.executeSql(sql, data)
      .then(data => {
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            let expense = {
              id: data.rows.item(i).id,
              name: data.rows.item(i)._name,
              value: data.rows.item(i)._value,
              description: data.rows.item(i)._description,
              expiry: data.rows.item(i)._expiry,
              buy: data.rows.item(i)._buy,
              expensesGroupId: data.rows.item(i).expense_group_id
            }
            expenses.push(expense);
          }
          }
      })
      .catch((e: any) => {
        console.error(e);
      });
    })
    .catch((e: any) => {
      console.error(e);
    });
    return expenses;
  }

  public update(expenses: IExpenses) {
    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'UPDATE expenses SET _name = ?, _description = ?, _value = ?, _expiry = ?, _buy = ? WHERE id = ?';
      let data = [expenses.name, expenses.description, expenses.value, expenses.expiry, expenses.buy, expenses.id];
      db.executeSql(sql, data)
      .then(() => console.log('expenses group updated'))
      .catch((e: any) => console.error(e));
    })
    .catch((e: any) => {
      console.error(e);
    });
  }
}
