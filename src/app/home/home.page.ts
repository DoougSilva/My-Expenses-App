import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ViewDidEnter,  } from '@ionic/angular';
import { DisplayComponent } from '../shared/components/display-component/display.component';
import { DatabaseService } from '../database/database.service';
import { HomeService } from './service/home.service';
import { IncomeService } from '../income/service/income.service';
import { ExpensesService } from '../expenses-group/expenses/service/expenses.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, DisplayComponent],
  providers: [DatabaseService, HomeService, IncomeService, ExpensesService, SQLite]
})
export class HomePage implements ViewDidEnter, OnDestroy {
  entity: string = 'Saldo';
  totalValue: string = '';
  chart: Chart | undefined;

  constructor(private router: Router, private service: HomeService) {}

  @ViewChild("graphic", { static: true}) element!: ElementRef;

  ionViewDidEnter() {
    this.service.getTotalValue().then((value: number) => {
      this.totalValue = `R$ ${value.toFixed(2)}`;
    });

    let income: number = 1;
    let expenses: number = 0;

    this.service.getIncome().then((incomeValue: number) => {
      this.service.getExpenses().then((expensesValue: number) => {
        income = incomeValue === 0 ? 1 : incomeValue;
        expenses = expensesValue;

        const dataValue = [income - expenses, expenses];

        const data = {
          labels: [
            'Renda',
            'Despesas',
          ],
          datasets: [{
            data: dataValue,
            backgroundColor: [
              'rgb(0, 255, 127)',
              'rgb(255, 99, 132)'
            ],
            hoverOffset: 4
          }]
        };

        if (this.chart) {
          this.chart.destroy();
        }

        this.chart = new Chart(this.element.nativeElement, {
          type: 'doughnut',
          data: data,
      });
      });
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  onIncome() {
    this.router.navigate(['income']);
  }

  onExpensesGroup() {
    this.router.navigate(['expenses-group']);
  }
}