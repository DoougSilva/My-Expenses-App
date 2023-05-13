import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ExpensesModalService } from './service/expenses-modal.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-modal',
  templateUrl: './expenses-modal.component.html',
  styleUrls: ['./expenses-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class ExpensesModalComponent {

  @Input() form: FormGroup;

  constructor(private modalController: ModalController,
              private service: ExpensesModalService,
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
