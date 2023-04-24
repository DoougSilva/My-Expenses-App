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

  constructor() { }

  ngOnInit() {
  }

  onOpen(event: any) {
    this.add.emit(event);
  }
}
