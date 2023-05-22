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

@Component({
  selector: 'app-expenses-group',
  templateUrl: './expenses-group.page.html',
  styleUrls: ['./expenses-group.page.scss'],
  standalone: true,
  imports: [IonicModule, ListComponent, DisplayComponent],
  providers: [ExpensesGroupService, DatabaseService, SQLite]
})
export class ExpensesGroupPage implements OnInit {

  expensesGroupList: IExpensesGroup[] = [];
  entity: string = 'Despesas';
  title: string = 'Grupo de despesas'
  totalValue: string = 'R$ 2.000,00'

  constructor(
    private router: Router, private modalService: ExpensesGroupModalService, private notificationService: NotificationService, private service: ExpensesGroupService) { }

  
    ngOnInit() {
      this.loadIncomes()
    }
  
    loadIncomes() {
      this.service.getAll().then((items: IExpensesGroup[]) => {
       this.expensesGroupList = items;
      })
     }

  onHome() {
    this.router.navigate(['home']);
  }

  onOpen(event: IExpenses) {
    this.router.navigate(['expenses'], { queryParams: {id: event.id} });
  }

  onEdit(entity: IExpensesGroup) {
    this.modalService.editModal(entity);
  }

  onDelete(entity: IExpensesGroup) {
    this.service.revome(entity.id);
    this.notificationService.success('Renda deletada com sucesso!');
  }

  onAdd() {
    this.modalService.openIonModal();
  }
}
