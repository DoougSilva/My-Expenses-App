import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { IncomeModalService } from './service/income-modal.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-modal',
  templateUrl: './income-modal.component.html',
  styleUrls: ['./income-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class IncomeModalComponent {

  @Input() form: FormGroup;

  constructor(private modalController: ModalController,
              private service: IncomeModalService,
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
