import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/database/database.service';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { IExpensesGroup } from '../model/expenses-group.interface';

@Injectable({
  providedIn: 'root',
  deps: [DatabaseService, SQLite]
})
export class ExpensesGroupService {

  constructor(private dbService: DatabaseService) { }

  public insert(expensesGroup: IExpensesGroup):void {
    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'INSERT INTO expenses_group (_name, _description) values (?, ?)';
      let data = [expensesGroup.name, expensesGroup.description];
      db.executeSql(sql, data)
      .then(() => console.log('expenses group saved'))
      .catch((e: any) => console.error(e));
    })
    .catch((e: any) => {
      console.error(e);
    });
  }

  public revome(id: number ):void {
    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'DELETE FROM expenses_group WHERE id = ?';
      let data = [id];
      db.executeSql(sql, data)
      .then(() => console.log('expenses group deleted'))
      .catch((e: any) => console.error(e));
    })
    .catch((e: any) => {
      console.error(e);
    });
  }

  public async getAll() {
    let expensesGroups = new Array<IExpensesGroup>();
    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT * FROM expenses_group';
      let data: any[] = [];
      db.executeSql(sql, data)
      .then(data => {
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            let expensesGroup = {
              id: data.rows.item(i).id,
              name: data.rows.item(i)._name,
              description: data.rows.item(i)._description,
            }
            expensesGroups.push(expensesGroup);
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
    return expensesGroups;
  }

  public update(expensesGroup: IExpensesGroup) {
    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'UPDATE expenses_group SET _name = ?, _description = ? WHERE id = ?';
      let data = [expensesGroup.name, expensesGroup.description, expensesGroup.id];
      db.executeSql(sql, data)
      .then(() => console.log('expenses group updated'))
      .catch((e: any) => console.error(e));
    })
    .catch((e: any) => {
      console.error(e);
    });
  }
}
