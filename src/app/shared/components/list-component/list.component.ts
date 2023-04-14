import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ListComponent  implements OnInit {
  @Input() list: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  open() {
    console.log('teste da list')
  }
}
