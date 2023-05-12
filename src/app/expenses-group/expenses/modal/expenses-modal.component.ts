import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ExpensesModalService } from './service/expenses-modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './expenses-modal.component.html',
  styleUrls: ['./expenses-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class ExpensesModalComponent {

  form: FormGroup;
  fb: FormBuilder = new FormBuilder();

  constructor(private modalController: ModalController,
              private service: ExpensesModalService) {
                this.form = service.createForm(this.fb);
   }

  async closeModal() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }
}
