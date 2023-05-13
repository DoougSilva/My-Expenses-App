import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ListComponent } from '../../shared/components/list-component/list.component';
import { DisplayComponent } from '../../shared/components/display-component/display.component';
import { ExpensesModalService } from './modal/service/expenses-modal.service';
import { IExpenses } from './model/expenses.interface';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
  standalone: true,
  imports: [IonicModule, ListComponent, DisplayComponent]
})
export class ExpensesPage implements OnInit {

  expensesList: IExpenses[] = [];
  entity: string = 'Despesas';
  totalValue: string = 'R$ 2.000,00'

  constructor(private router: Router, private modalService: ExpensesModalService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.expensesList = [{id: '15df1sd5fs5d', name: 'R$1.500,00'}, {id: 'Poupança', name: 'R$500,00'}] as IExpenses[];
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

  onDelete(entity: IExpenses) {
    //service responsavel pelo crud executando o delete
    this.notificationService.success('Renda deletada com sucesso!');
  }
}
