import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ListComponent } from '../shared/components/list-component/list.component';
import { DisplayComponent } from '../shared/components/display-component/display.component';
import { ExpensesGroupModalService } from './modal/service/expenses-group-modal.service';
import { NotificationService } from '../shared/services/notification.service';
import { IExpenses } from './expenses/model/expenses.interface';
import { IExpensesGroup } from './model/expenses-group.interface';
import { ExpensesGroupService } from './service/expenses-group.service';
import { DatabaseService } from '../database/database.service';
import { SQLite } from '@ionic-native/sqlite/ngx'
import { ExpensesService } from './expenses/service/expenses.service';

@Component({
  selector: 'app-expenses-group',
  templateUrl: './expenses-group.page.html',
  styleUrls: ['./expenses-group.page.scss'],
  standalone: true,
  imports: [IonicModule, ListComponent, DisplayComponent],
  providers: [ExpensesGroupService, DatabaseService, SQLite, ExpensesService]
})
export class ExpensesGroupPage implements OnInit {

  expensesGroupList: IExpensesGroup[] = [];
  entity: string = 'Despesas';
  title: string = 'Grupo de despesas'
  totalValue: string = ''

  constructor(
    private router: Router, private modalService: ExpensesGroupModalService, private notificationService: NotificationService, private service: ExpensesGroupService) { }

  
  ngOnInit() {
    this.reload();
  }
  
  loadIncomes() {
    this.service.getAll().then((items: IExpensesGroup[]) => {
      this.expensesGroupList = items;
    })
  }

   setTotalValue() {
    this.service.sumValue().then((value: number) => {
      this.totalValue = `R$ ${value}`;
    })
  }

  reload() {
    this.loadIncomes();
    this.setTotalValue();
  }

  onHome() {
    this.router.navigate(['home']);
  }

  onOpen(event: IExpenses) {
    this.router.navigate(['expenses'], { queryParams: {id: event.id} });
  }

  onEdit(entity: IExpensesGroup) {
    this.modalService.editModal(entity).then(() => {
      this.reload();
    });
  }

  onDelete(entity: IExpensesGroup) {
    this.service.revome(entity.id);
    this.reload();
    this.notificationService.success('Renda deletada com sucesso!');
  }

  onAdd() {
    this.modalService.openIonModal().then(() => {
      this.reload();
    });
  }
}
