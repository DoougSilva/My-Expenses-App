import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { IncomeModalService } from './service/income-modal.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IncomeService } from '../service/income.service';
import { DatabaseService } from 'src/app/database/database.service';
import { SQLite } from '@ionic-native/sqlite/ngx'
import { Iincome } from '../model/income.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './income-modal.component.html',
  styleUrls: ['./income-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule],
  providers: [IncomeService, DatabaseService, SQLite]
})
export class IncomeModalComponent {

  @Input() form: FormGroup;

  constructor(private modalController: ModalController,
              private service: IncomeModalService,
              private notificationService: NotificationService,
              private incomeService: IncomeService) {
                this.form = service.createForm();
              }
              
    save() {
    const entity = {
      id: this.form.value?.id,
      name: this.form.value?.name,
      description: this.form.value?.description,
      value: this.form.value?.value
    } as Iincome;

    if (entity.id) {
      this.incomeService.update(entity);
      this.closeModal()
      this.notificationService.success('Grupo de despesas salvo com sucesso!');
      return;
    }

    this.incomeService.insert(entity);
    this.closeModal()
    this.notificationService.success('Grupo de despesas salvo com sucesso!');
  }

  async closeModal() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }
}
