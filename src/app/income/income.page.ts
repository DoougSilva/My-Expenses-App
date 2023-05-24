import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Iincome } from './model/income.interface';
import { ListComponent } from '../shared/components/list-component/list.component';
import { DisplayComponent } from '../shared/components/display-component/display.component';
import { IncomeModalService } from './modal/service/income-modal.service';
import { NotificationService } from '../shared/services/notification.service';
import { IncomeService } from './service/income.service';
import { DatabaseService } from '../database/database.service';
import { SQLite } from '@ionic-native/sqlite/ngx'

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
  standalone: true,
  imports: [IonicModule, ListComponent, DisplayComponent],
  providers: [IncomeService, DatabaseService, SQLite]
})
export class IncomePage implements OnInit {

  incomeList: Iincome[] = [];
  entity: string = 'Rendas';
  totalValue: string = '';

  constructor(private router: Router, private modalService: IncomeModalService, private notificationService: NotificationService, private service: IncomeService) { }

  ngOnInit() {
    this.reload();
  }

  loadIncomes() {
    this.service.getAll().then((items: Iincome[]) => {
     this.incomeList = items;
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

  onEdit(entity: Iincome) {
    this.modalService.editModal(entity).then(() => {
      this.reload();
    });
  }

  onAdd() {
    this.modalService.openIonModal().then(() => {
      this.reload();
    });
  }

  onDelete(entity: Iincome) {
    this.service.revome(entity.id);
    this.reload();
    this.notificationService.success('Renda deletada com sucesso!');
  }
}
