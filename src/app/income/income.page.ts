import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IncomeListComponent } from './components/income-list/income-list.component';
import { Iincome } from './model/income.interface';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
  standalone: true,
  imports: [IonicModule, IncomeListComponent]
})
export class IncomePage implements OnInit {

  incomeList: Iincome[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.incomeList = [{id: 'Salario', name: 'R$1.500,00'}, {id: 'Poupança', name: 'R$500,00'}] as Iincome[];
  }

  onHome() {
    this.router.navigate(['home']);
  }
}
