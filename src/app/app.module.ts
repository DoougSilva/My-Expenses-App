import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { DatabaseService } from './database/database.service';
import { IncomeService } from './income/service/income.service';
import { ExpensesGroupService } from './expenses-group/service/expenses-group.service';
import { ExpensesService } from './expenses-group/expenses/service/expenses.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    ],
  providers: [
    SQLite,
    DatabaseService,
    IncomeService,
    ExpensesGroupService,
    ExpensesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
