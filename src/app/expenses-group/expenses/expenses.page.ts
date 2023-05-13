import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Iincome } from '../../income/model/income.interface';
import { ListComponent } from '../../shared/components/list-component/list.component';
import { DisplayComponent } from '../../shared/components/display-component/display.component';
import { ExpensesModalService } from './modal/service/expenses-modal.service';
import { IExpenses } from './model/expenses.interface';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
  standalone: true,
  imports: [IonicModule, ListComponent, DisplayComponent]
})
export class ExpensesPage implements OnInit {

  incomeList: Iincome[] = [];
  entity: string = 'Despesas';
  totalValue: string = 'R$ 2.000,00'

  constructor(private router: Router, private modalService: ExpensesModalService) { }

  ngOnInit() {
    this.incomeList = [{id: '15df1sd5fs5d', name: 'R$1.500,00'}, {id: 'Poupança', name: 'R$500,00'}] as Iincome[];
  }

  onGroup() {
    this.router.navigate(['expenses-group']);
  }

  onAdd() {
    this.modalService.openIonModal();
  }

  onEdit(entity: IExpenses) {
    this.modalService.editModal(entity);
  }
}
