import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ExpensesModalService } from './service/expenses-modal.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IExpenses } from '../model/expenses.interface';
import { ExpensesService } from '../service/expenses.service';
import { DatabaseService } from 'src/app/database/database.service';
import { SQLite } from '@ionic-native/sqlite/ngx'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './expenses-modal.component.html',
  styleUrls: ['./expenses-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule],
  providers: [ExpensesService, DatabaseService, SQLite]
})
export class ExpensesModalComponent {

  @Input() form: FormGroup;

  constructor(private modalController: ModalController,
              private service: ExpensesModalService,
              private notificationService: NotificationService,
              private expensesService: ExpensesService,
              private route: ActivatedRoute) {
                this.form = service.createForm();
   }

   save() {
    let id = 0;
    this.route.queryParams.subscribe(params => {
      id = params['id'];
    })

    const entity = {
      id: this.form.value?.id,
      name: this.form.value?.name,
      description: this.form.value?.description,
      value: this.form.value?.value,
      expiry: this.form.value?.expiry,
      paid: this.form.value?.paid,
      indeterminate: this.form.value?.indeterminate,
      installments: this.form.value?.installments,
      recurrent: this.form.value?.recurrent,
      expensesGroupId: id
    } as IExpenses;

    if (entity.id) {
      this.expensesService.update(entity);
      this.closeModal()
      this.notificationService.success('Despesas salva com sucesso!');
      return;
    }

    this.expensesService.insert(entity);
    this.closeModal()
    this.notificationService.success('Despesas salva com sucesso!');
  }

  async closeModal() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss({
      dismissed: true,
      data: close
    });
  }
}
