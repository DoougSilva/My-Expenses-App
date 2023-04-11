import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Iincome } from '../../model/income.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class IncomeListComponent  implements OnInit {
  @Input() incomes:Iincome[] = [];

  constructor() { }

  ngOnInit() {
  }
}
