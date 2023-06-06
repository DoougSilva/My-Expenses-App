import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ViewDidEnter, ViewDidLeave, ViewWillLeave } from '@ionic/angular';
import { DisplayComponent } from '../shared/components/display-component/display.component';
import { DatabaseService } from '../database/database.service';
import { HomeService } from './service/home.service';
import { IncomeService } from '../income/service/income.service';
import { ExpensesService } from '../expenses-group/expenses/service/expenses.service';
import { SQLite } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, DisplayComponent],
  providers: [DatabaseService, HomeService, IncomeService, ExpensesService, SQLite]
})
export class HomePage implements ViewDidEnter {
  entity: string = 'Saldo';
  totalValue: string = ''
;
  constructor(private router: Router, private service: HomeService) {}

  ionViewDidEnter() {
    this.service.getTotalValue().then((value: number) => {
      this.totalValue = `R$ ${value.toFixed(2)}`;
    })
  }

  onIncome() {
    this.router.navigate(['income']);
  }

  onExpensesGroup() {
    this.router.navigate(['expenses-group']);
  }
}
