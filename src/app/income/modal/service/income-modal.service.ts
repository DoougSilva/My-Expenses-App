import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IncomeModalComponent } from '../income-modal.component';
import { FormBuilder } from '@angular/forms';
import { Iincome } from '../../model/income.interface';

@Injectable({
  providedIn: 'root'
})
export class IncomeModalService {

  fb: FormBuilder = new FormBuilder();

  constructor(private modalController: ModalController) { }

  createForm() {
    return this.fb.group({
      id: [null],
      name:[''],
      value:[''],
      description: ['']
    });
  }

  createEditForm(entity: Iincome) {
    return this.fb.group({
      id: [entity.id],
      name:[entity.name],
      value:[entity.value],
      description: [entity.description]
    });
  }

  async editModal(entity: Iincome) {
    const editForm = this.createEditForm(entity);
    const modal = await this.modalController.create({
      component: IncomeModalComponent,
      componentProps:{
        form: editForm
      }
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }

  async openIonModal() {
    const modal = await this.modalController.create({
      component: IncomeModalComponent
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }
}
