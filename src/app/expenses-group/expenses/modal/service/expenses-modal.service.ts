import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExpensesModalComponent } from '../expenses-modal.component';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ExpensesModalService {

  constructor(private modalController: ModalController) { }

  createForm(fb: FormBuilder) {
    return fb.group({
      id: [null],
      name:[''],
      description: ['']
    });
  }

  async openIonModal() {
    const modal = await this.modalController.create({
      component: ExpensesModalComponent
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }
}
