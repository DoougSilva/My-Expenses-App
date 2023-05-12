import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IncomeModalComponent } from '../income-modal.component';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class IncomeModalService {

  constructor(private modalController: ModalController) { }

  createForm(fb: FormBuilder) {
    return fb.group({
      id: [null],
      name:[''],
      value:[''],
      description: ['']
    });
  }

  async openIonModal() {
    const modal = await this.modalController.create({
      component: IncomeModalComponent
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }
}
