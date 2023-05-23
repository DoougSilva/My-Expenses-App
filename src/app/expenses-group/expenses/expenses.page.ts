import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ListComponent } from '../../shared/components/list-component/list.component';
import { DisplayComponent } from '../../shared/components/display-component/display.component';
import { ExpensesModalService } from './modal/service/expenses-modal.service';
import { IExpenses } from './model/expenses.interface';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ExpensesService } from './service/expenses.service';
import { DatabaseService } from 'src/app/database/database.service';
import { SQLite } from '@ionic-native/sqlite/ngx'

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
  standalone: true,
  imports: [IonicModule, ListComponent, DisplayComponent],
  providers: [ExpensesService, DatabaseService, SQLite]
})
export class ExpensesPage implements OnInit {

  expensesList: IExpenses[] = [];
  entity: string = 'Despesas';
  totalValue: string = ''

  constructor(private router: Router, private route: ActivatedRoute , private modalService: ExpensesModalService, private notificationService: NotificationService, private service: ExpensesService) { }

  ngOnInit() {
    this.loadIncomes();
    this.setTotalValue();
  }

  loadIncomes() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.service.getAll(id).then((items: IExpenses[]) => {
      this.expensesList = items;
    })
    })
   }

   setTotalValue() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.service.sumValue(id).then((value: number) => {
      this.totalValue = `R$ ${value}`;
    })
    })
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
    this.service.revome(entity.id);
    this.notificationService.success('Renda deletada com sucesso!');
  }
}
