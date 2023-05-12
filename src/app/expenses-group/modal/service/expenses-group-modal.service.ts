import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExpensesGroupModalComponent } from '../expenses-group-modal.component';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ExpensesGroupModalService {

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
      component: ExpensesGroupModalComponent
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }
}
