import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExpensesGroupModalComponent } from '../expenses-group-modal.component';
import { FormBuilder, Validators } from '@angular/forms';
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
      name:['', Validators.required],
      description: ['']
    });
  }

  createEditForm(entity: IExpensesGroup) {
    return this.fb.group({
      id: [entity.id],
      name:[entity.name, Validators.required],
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
    await modal.present();
    const { data } = await modal.onDidDismiss();
  
    return data;
  }

  async openIonModal() {
    const modal = await this.modalController.create({
      component: ExpensesGroupModalComponent
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  
    return data;
  }
}
