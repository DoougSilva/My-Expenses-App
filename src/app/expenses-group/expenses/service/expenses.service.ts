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

  public insert(expenses: any):void {
    let date = new Date();

    if (date.getMonth() === 12) {
    date.setFullYear(date.getFullYear()+1)
    }
    date.setMonth(date.getMonth()+1);

    let ano = date.getFullYear().toString();
    let mes = (date.getMonth() + 1).toString().padStart(2, '0');
    let dia = '1';

    let dataFormatada = ano + '-' + mes + '-' + dia;

    expenses.control = dataFormatada;
    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'INSERT INTO expenses (_name, _description, _value, _expiry, _paid, _recurrent , _indeterminate, _installments, _control, expense_group_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
      let data = [expenses.name, expenses.description, expenses.value, expenses.expiry, expenses.paid, expenses.recurrent, expenses.indeterminate, expenses.installments, expenses.control, expenses.expensesGroupId];
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

  public revomeByExpensesGroup(id: number ):void {
    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'DELETE FROM expenses WHERE expense_group_id = ?';
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
      let sql = 'SELECT * FROM expenses WHERE expense_group_id = ? AND _paid = "false"';
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
              paid: data.rows.item(i)._paid,
              expensesGroupId: data.rows.item(i).expense_group_id,
              recurrent: data.rows.item(i)._recurrent,
              indeterminate: data.rows.item(i)._indeterminate,
              installments: data.rows.item(i)._installments,
              control: data.rows.item(i)._control
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

  public async getAllpaid(id: number) {
    let expenses = new Array<IExpenses>();
    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT * FROM expenses WHERE expense_group_id = ? AND _paid = "true"';
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
              paid: data.rows.item(i)._paid,
              expensesGroupId: data.rows.item(i).expense_group_id,
              recurrent: data.rows.item(i)._recurrent,
              indeterminate: data.rows.item(i)._indeterminate,
              installments: data.rows.item(i)._installments,
              control: data.rows.item(i)._control
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
      let sql = 'UPDATE expenses SET _paid = ?, _name = ?, _description = ?, _value = ?, _expiry = ?, _recurrent = ?, _indeterminate = ?, _installments = ?, _control = ? WHERE id = ?';
      let data = [expenses.paid, expenses.name, expenses.description, expenses.value, expenses.expiry, expenses.recurrent, expenses.indeterminate, expenses.installments, expenses.control, expenses.id];
      db.executeSql(sql, data)
      .then(() => console.log('expenses group updated'))
      .catch((e: any) => console.error(e));
    })
    .catch((e: any) => {
      console.error(e);
    });
  }

  public pay(id: number) {
    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'UPDATE expenses SET _paid = ? WHERE id = ?';
      let data = [true, id];
      db.executeSql(sql, data)
      .then(() => console.log('expenses group updated'))
      .catch((e: any) => console.error(e));
    })
    .catch((e: any) => {
      console.error(e);
    });
  }

  public async sumAllValue(): Promise<number> {
    let value = 0;
    try {
      const db = await this.dbService.getDB();
      let sql = 'SELECT SUM(_value) AS totalValue FROM expenses';
      let data: any[] = [];
      const queryResult = await db.executeSql(sql, data);
      value = queryResult.rows.item(0).totalValue;
    } catch (e: any) {
      console.error(e);
    }
    return value === null ? 0 : value ;
  }

  public async sumValue(id: number): Promise<number> {
    let value = 0;
    try {
      const db = await this.dbService.getDB();
      let sql = 'SELECT SUM(_value) AS totalValue FROM expenses WHERE expense_group_id = ?';
      let data: any[] = [id];
      const queryResult = await db.executeSql(sql, data);
      value = queryResult.rows.item(0).totalValue;
    } catch (e: any) {
      console.error(e);
    }
    return value === null ? 0 : value ;
  }

  public async reset() {
    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT * FROM expenses WHERE _recurrent = "true" AND _paid = "false"';
      let data: any[] = [];
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
              paid: data.rows.item(i)._paid,
              expensesGroupId: data.rows.item(i).expense_group_id,
              recurrent: data.rows.item(i)._recurrent,
              indeterminate: data.rows.item(i)._indeterminate,
              installments: data.rows.item(i)._installments,
              control: data.rows.item(i)._control
            }

            let date = new Date(expense.control);

            if (date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate()) {
              let date = new Date(expense.control);

              if (date.getMonth() === 12) {
              date.setFullYear(date.getFullYear()+1)
              }
              date.setMonth(date.getMonth()+1);
          
              let ano = date.getFullYear().toString();
              let mes = (date.getMonth() + 1).toString().padStart(2, '0');
              let dia = '1';
          
              let dataFormatada = ano + '-' + mes + '-' + dia;
          
              console.log(expense.control);
              expense.control = dataFormatada;
              console.log(expense.control);  

              expense.id = null;
              expense.name = expense.name + ' *';
              expense.recurrent = 'false';

              this.insert(expense);
            }
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

    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT * FROM expenses WHERE _recurrent = "true" AND _indeterminate = "false"';
      let data: any[] = [];
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
              paid: data.rows.item(i)._paid,
              expensesGroupId: data.rows.item(i).expense_group_id,
              recurrent: data.rows.item(i)._recurrent,
              indeterminate: data.rows.item(i)._indeterminate,
              installments: data.rows.item(i)._installments,
              control: data.rows.item(i)._control
            }

            let date = new Date(expense.control);

            if (date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate()) {
              let date = new Date(expense.control);

              if (date.getMonth() === 12) {
              date.setFullYear(date.getFullYear()+1)
              }
              date.setMonth(date.getMonth()+1);
          
              let ano = date.getFullYear().toString();
              let mes = (date.getMonth() + 1).toString().padStart(2, '0');
              let dia = '1';
          
              let dataFormatada = ano + '-' + mes + '-' + dia;
          
            expense.control = dataFormatada;  

            let dates = new Date(expense.expiry);

            if (dates.getMonth() === 12) {
              dates.setFullYear(dates.getFullYear()+1)
            }

            dates.setMonth(dates.getMonth()+1);

            let anoTemp = dates.getFullYear().toString();
            let mesTemp = (dates.getMonth() + 1).toString().padStart(2, '0');
            let diaTemp = (dates.getDate() + 1).toString().padStart(2, '0');

            let dataFormatadas = anoTemp + '-' + mesTemp + '-' + diaTemp;

              if (expense.indeterminate === 'false'){
                expense.installments -= 1;
              }

              expense.expiry = dataFormatadas;

              expense.paid = 'false';

              this.update(expense);
            }
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

    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT * FROM expenses WHERE _recurrent = "true" AND _indeterminate = "true"';
      let data: any[] = [];
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
              paid: data.rows.item(i)._paid,
              expensesGroupId: data.rows.item(i).expense_group_id,
              recurrent: data.rows.item(i)._recurrent,
              indeterminate: data.rows.item(i)._indeterminate,
              installments: data.rows.item(i)._installments,
              control: data.rows.item(i)._control
            }

            let date = new Date(expense.control);

            if (date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate()) {
              let date = new Date(expense.control);

              if (date.getMonth() === 12) {
              date.setFullYear(date.getFullYear()+1)
              }
              date.setMonth(date.getMonth()+1);
          
              let ano = date.getFullYear().toString();
              let mes = (date.getMonth() + 1).toString().padStart(2, '0');
              let dia = '1';
          
              let dataFormatada = ano + '-' + mes + '-' + dia;
          
            expense.control = dataFormatada;  

            let dates = new Date(expense.expiry);

            if (dates.getMonth() === 12) {
              dates.setFullYear(dates.getFullYear()+1)
            }
            dates.setMonth(dates.getMonth()+1);

            let anoTemp = dates.getFullYear().toString();
            let mesTemp = (dates.getMonth() + 1).toString().padStart(2, '0');
            let diaTemp = (dates.getDate() + 1).toString().padStart(2, '0');

            let dataFormatadas = anoTemp + '-' + mesTemp + '-' + diaTemp;


            expense.expiry = dataFormatadas;

            expense.paid = 'false';

            this.update(expense);  
          }
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

    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT * FROM expenses WHERE _recurrent = "false" AND _paid = "true"';
      let data: any[] = [];
      db.executeSql(sql, data)
      .then(data => {
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            let date = new Date(data.rows.item(i)._control);

           if (date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate()) { 
              this.revome(data.rows.item(i).id);
            }
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

    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT * FROM expenses WHERE _recurrent = "true" AND _paid = "true" AND _indeterminate = "false" AND _installments = 1';
      let data: any[] = [];
      db.executeSql(sql, data)
      .then(data => {
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
             let date = new Date(data.rows.item(i)._control);
            
            if (date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate()) { 
              this.revome(data.rows.item(i).id);
            }
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
  }
}
