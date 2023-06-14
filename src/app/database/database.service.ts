import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private sqlite: SQLite) { }

  public getDB(): Promise<SQLiteObject> {
    return this.sqlite.create({
      name: 'expensesdb',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        return this.createTable(db);
      })
      .then(() => {
        console.log('Tables Created!');
      })
      .catch((e: any) => {
        console.error(e);
      });
  }

  private createTable(db: SQLiteObject) {
    return db.sqlBatch([
      'CREATE TABLE IF NOT EXISTS income (id INTEGER PRIMARY KEY AUTOINCREMENT, _name TEXT, _description TEXT, _value REAL);',
      'CREATE TABLE IF NOT EXISTS expenses_group (id INTEGER PRIMARY KEY AUTOINCREMENT, _name TEXT, _description TEXT);',
      'CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, _name TEXT, _description TEXT, _value REAL, _expiry TIMESTAMP, _paid BOOLEAN, _recurrent BOOLEAN, _indeterminate BOOLEAN, _installments INTEGER, _control TIMESTAMP, expense_group_id INTEGER, FOREIGN KEY (expense_group_id) REFERENCES expense_group (id));'
    ])
      .then(() => {
        console.log('Tabelas criadas com sucesso');
      })
      .catch(e => {
        console.error(e);
      });
  }
}
