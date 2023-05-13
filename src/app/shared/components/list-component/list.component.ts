import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { IonicModule } from '@ionic/angular';
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

  constructor() { }

  ngOnInit() {
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(event: any) {
    this.edit.emit(event);
  }

  onOpen(event: any) {
    this.open.emit(event);
  }
}
