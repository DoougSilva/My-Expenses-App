import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Iincome } from '../income/model/income.interface';
import { ListComponent } from '../shared/components/list-component/list.component';
import { DisplayComponent } from '../shared/components/display-component/display.component';
import { ExpensesGroupModalService } from './modal/service/expenses-group-modal.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-expenses-group',
  templateUrl: './expenses-group.page.html',
  styleUrls: ['./expenses-group.page.scss'],
  standalone: true,
  imports: [IonicModule, ListComponent, DisplayComponent]
})
export class ExpensesGroupPage implements OnInit {

  incomeList: Iincome[] = [];
  entity: string = 'Despesas';
  title: string = 'Grupo de despesas'
  totalValue: string = 'R$ 2.000,00'

  constructor(
    private router: Router, private modalService: ExpensesGroupModalService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.incomeList = [{id: '998dfs8', name: 'R$1.500,00'}, {id: 'Poupança', name: 'R$500,00'}] as Iincome[];
  }

  onHome() {
    this.router.navigate(['home']);
  }

  onOpen(event: Iincome) {
    this.router.navigate(['expenses']);
  }

  onEdit(entity: Iincome) {
    this.modalService.editModal(entity);
  }

  onDelete(entity: Iincome) {
    //service responsavel pelo crud executando o delete
    this.notificationService.success('Renda deletada com sucesso!');
  }

  onAdd() {
    this.modalService.openIonModal();
  }
}
