import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Iincome } from '../../income/model/income.interface';
import { ListComponent } from '../../shared/components/list-component/list.component';
import { DisplayComponent } from '../../shared/components/display-component/display.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
  standalone: true,
  imports: [IonicModule, ListComponent, DisplayComponent, ModalComponent]
})
export class ExpensesPage implements OnInit {

  incomeList: Iincome[] = [];
  entity: string = 'Despesas';
  totalValue: string = 'R$ 2.000,00'

  constructor(private router: Router) { }

  ngOnInit() {
    this.incomeList = [{id: '15df1sd5fs5d', name: 'R$1.500,00'}, {id: 'Poupança', name: 'R$500,00'}] as Iincome[];
  }

  onGroup() {
    this.router.navigate(['expenses-group']);
  }

}
