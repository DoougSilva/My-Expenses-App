import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ExpensesGroupModalService } from './service/expenses-group-modal.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-expenses-modal',
  templateUrl: './expenses-group-modal.component.html',
  styleUrls: ['./expenses-group-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class ExpensesGroupModalComponent {

  @Input() form: FormGroup;

  constructor(private modalController: ModalController,
              private service: ExpensesGroupModalService,
              private notificationService: NotificationService) {
                this.form = service.createForm();
   }

  save() {
    //service responsavel pelo crud executando o delete
    this.closeModal()
    this.notificationService.success('Grupo de despesas salvo com sucesso!');
  }

  async closeModal() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }
}
