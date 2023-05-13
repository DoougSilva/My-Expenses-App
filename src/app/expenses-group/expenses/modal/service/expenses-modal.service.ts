import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExpensesModalComponent } from '../expenses-modal.component';
import { FormBuilder } from '@angular/forms';
import { IExpenses } from '../../model/expenses.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpensesModalService {

  fb: FormBuilder = new FormBuilder();

  constructor(private modalController: ModalController) { }

  createForm() {
    return this.fb.group({
      id: [null],
      name:[''],
      expiry:[''],
      description: ['']
    });
  }

  createEditForm(entity: IExpenses) {
    return this.fb.group({
      id: [entity.id],
      name:[entity.name],
      expiry:[entity.expiry],
      description: [entity.description]
    });
  }

  async editModal(entity: IExpenses) {
    const editForm = this.createEditForm(entity);
    const modal = await this.modalController.create({
      component: ExpensesModalComponent,
      componentProps:{
        form: editForm
      }
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }

  async openIonModal() {
    const modal = await this.modalController.create({
      component: ExpensesModalComponent
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }
}
