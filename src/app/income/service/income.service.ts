import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/database/database.service';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Iincome } from '../model/income.interface';

@Injectable({
  providedIn: 'root',
  deps: [DatabaseService, SQLite]
})
export class IncomeService {

  constructor(private dbService: DatabaseService) { }

  public insert(income: Iincome):void {
    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'INSERT INTO income (_name, _description, _value) values (?, ?, ?)';
      let data = [income.name, income.description, income.value];
      db.executeSql(sql, data)
      .then(() => console.log('income saved'))
      .catch((e: any) => console.error(e));
    })
    .catch((e: any) => {
      console.error(e);
    });
  }

  public revome(id: number ):void {
    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'DELETE FROM income WHERE id = ?';
      let data = [id];
      db.executeSql(sql, data)
      .then(() => console.log('income deleted'))
      .catch((e: any) => console.error(e));
    })
    .catch((e: any) => {
      console.error(e);
    });
  }

  public async getAll() {
    let incomes = new Array<Iincome>();
    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT * FROM income';
      let data: any[] = [];
      db.executeSql(sql, data)
      .then(data => {
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            let income = {
              id: data.rows.item(i).id,
              name: data.rows.item(i)._name,
              description: data.rows.item(i)._description,
              value: data.rows.item(i)._value
            }
            incomes.push(income);
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
    return incomes;
  }

  public update(income: Iincome) {
    this.dbService.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'UPDATE income SET _name = ?, _description = ?, _value = ? WHERE id = ?';
      let data = [income.name, income.description, income.value, income.id];
      db.executeSql(sql, data)
      .then(() => console.log('income updated'))
      .catch((e: any) => console.error(e));
    })
    .catch((e: any) => {
      console.error(e);
    });
  }

  public async sumValue(): Promise<number> {
    let value = 0;
    try {
      const db = await this.dbService.getDB();
      let sql = 'SELECT SUM(_value) AS totalValue FROM income';
      let data: any[] = [];
      const queryResult = await db.executeSql(sql, data);
      value = queryResult.rows.item(0).totalValue;
    } catch (e: any) {
      console.error(e);
    }
    return value === null ? 0 : value ;
  }

}
