import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IncomeModalComponent } from '../income-modal.component';
import { FormBuilder } from '@angular/forms';
import { Iincome } from '../../model/income.interface';
import { IncomePage } from '../../income.page';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IncomeModalService {

  fb: FormBuilder = new FormBuilder();

  constructor(private modalController: ModalController, private router: Router) { }

  createForm() {
    return this.fb.group({
      id: [null],
      name:[''],
      value:[0],
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

    await modal.present();
    const { data } = await modal.onDidDismiss();
  
    return data;
  }

  async openIonModal(): Promise<any> {
    const modal = await this.modalController.create({
      component: IncomeModalComponent
    });
  
    await modal.present();
    const { data } = await modal.onDidDismiss();
  
    return data;
  }
}
