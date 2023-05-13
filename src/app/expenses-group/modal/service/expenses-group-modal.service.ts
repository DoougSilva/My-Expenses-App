import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExpensesGroupModalComponent } from '../expenses-group-modal.component';
import { FormBuilder } from '@angular/forms';
import { IExpensesGroup } from '../../model/expenses-group.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpensesGroupModalService {

  fb: FormBuilder = new FormBuilder();

  constructor(private modalController: ModalController) { }

  createForm() {
    return this.fb.group({
      id: [null],
      name:[''],
      description: ['']
    });
  }

  createEditForm(entity: IExpensesGroup) {
    return this.fb.group({
      id: [entity.id],
      name:[entity.name],
      description: [entity.description]
    });
  }

  async editModal(entity: IExpensesGroup) {
    const editForm = this.createEditForm(entity);
    const modal = await this.modalController.create({
      component: ExpensesGroupModalComponent,
      componentProps:{
        form: editForm
      }
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }

  async openIonModal() {
    const modal = await this.modalController.create({
      component: ExpensesGroupModalComponent
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }
}
