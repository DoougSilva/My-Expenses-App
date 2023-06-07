import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExpensesModalComponent } from '../expenses-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IExpenses } from '../../model/expenses.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpensesModalService {

  constructor(private modalController: ModalController, private formBuilder: FormBuilder) { }

  createForm(entity?: any): FormGroup {
    const form = this.formBuilder.group({
      id: [entity ? entity.id : null],
      name: [entity ? entity.name : '', Validators.required],
      value: [entity ? entity.value : null, Validators.required],
      description: [entity ? entity.description : ''],
      recurrent: [entity ? entity.recurrent : false],
      expiry: [entity ? entity.expiry : '', Validators.required],
      indeterminate: [entity ? entity.indeterminate : false],
      installments: [entity ? entity.installments : null, Validators.required]
    });

  const recurrentControl = form.get('recurrent');
  const expiryControl = form.get('expiry');
  const indeterminateControl = form.get('indeterminate');
  const installmentsControl = form.get('installments');

  if (entity?.recurrent === 'true') {
    indeterminateControl?.enable();
    expiryControl?.enable();
    if (entity.indeterminate === 'true') {
      installmentsControl?.disable();
    } else {
      installmentsControl?.enable();
    }
  } else {
    indeterminateControl?.disable();
    expiryControl?.disable();
    installmentsControl?.disable();
  }
 
  recurrentControl?.valueChanges.subscribe((value) => {
  if (value) {
    indeterminateControl?.enable();
    expiryControl?.enable();
    if (!form.get('indeterminate')?.value) {
      installmentsControl?.enable();
    } else {
      installmentsControl?.disable();
    }
  } else {
    indeterminateControl?.disable();
    expiryControl?.disable();
    installmentsControl?.disable();
  }
});

  indeterminateControl?.valueChanges.subscribe((value) => {
    if (value) {
      installmentsControl?.disable();
    } else {
      installmentsControl?.enable();
    }
  });
  return form;
  }

  async editModal(entity: IExpenses) {
    const form = this.createForm(entity);

    const modal = await this.modalController.create({
      component: ExpensesModalComponent,
      componentProps: {
        form: form
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    return data;
  }

  async openIonModal() {
    const form = this.createForm();

    const modal = await this.modalController.create({
      component: ExpensesModalComponent,
      componentProps: {
        form: form
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    return data;
  }
}
