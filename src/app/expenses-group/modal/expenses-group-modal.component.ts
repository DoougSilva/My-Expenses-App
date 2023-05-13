import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ExpensesGroupModalService } from './service/expenses-group-modal.service';

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
              private service: ExpensesGroupModalService) {
                this.form = service.createForm();
   }

  async closeModal() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }
}
