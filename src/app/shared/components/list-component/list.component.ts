import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Iincome } from 'src/app/income/model/income.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ListComponent  implements OnInit {
  @Input() list: any[] = [];
  @Input() title: string = '';
  @Output() add = new EventEmitter(false);
  @Output() open = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  entityToDelete: any;

  alertButtons = [
    {
      text: 'Deletar',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.onDelete(this.entityToDelete);
      }
    },
    {
      text: 'Cancelar',
      handler: () => {
        this.entityToDelete = null;
      }
    }
  ];

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(event: any) {
    this.edit.emit(event);
  }

  onDelete(event: any) {
    this.delete.emit(event);
  }

  onOpen(event: any) {
    this.open.emit(event);
  }

  async confirmDelete(entity: any) {
    this.entityToDelete = entity;
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'This is an alert!',
      buttons: this.alertButtons
    });

    await alert.present();
  }
}
