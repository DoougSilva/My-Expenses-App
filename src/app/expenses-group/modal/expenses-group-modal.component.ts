import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ExpensesGroupModalService } from './service/expenses-group-modal.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ExpensesGroupService } from '../service/expenses-group.service';
import { IExpensesGroup } from '../model/expenses-group.interface';
import { DatabaseService } from 'src/app/database/database.service';
import { SQLite } from '@ionic-native/sqlite/ngx'

@Component({
  selector: 'app-expenses-modal',
  templateUrl: './expenses-group-modal.component.html',
  styleUrls: ['./expenses-group-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule],
  providers: [ExpensesGroupService, DatabaseService, SQLite]
})
export class ExpensesGroupModalComponent {

  @Input() form: FormGroup;

  constructor(private modalController: ModalController,
              private service: ExpensesGroupModalService,
              private notificationService: NotificationService,
              private expensesGroupService: ExpensesGroupService) {
                this.form = service.createForm();
   }

  save() {
    const entity = {
      id: this.form.value?.id,
      name: this.form.value?.name,
      description: this.form.value?.description,
    } as IExpensesGroup;

    if (entity.id) {
      this.expensesGroupService.update(entity);
      this.closeModal()
      this.notificationService.success('Grupo de despesas salvo com sucesso!');
      return;
    }

    this.expensesGroupService.insert(entity);
    this.closeModal()
    this.notificationService.success('Grupo de despesas salvo com sucesso!');
  }

  async closeModal() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }
}
