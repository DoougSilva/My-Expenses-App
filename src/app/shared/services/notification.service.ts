import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastController: ToastController) { }

  async error() {
    const toast = await this.toastController.create({
      message: 'Ocorreu um erro ao execultar essa ação.',
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
  
    await toast.present();
  }

  async success(message: string) {
    const toast = await this.toastController.create({
      message: `${message}`,
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
  
    await toast.present();
  }
}
