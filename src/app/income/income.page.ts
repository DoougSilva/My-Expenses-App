import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Iincome } from './model/income.interface';
import { ListComponent } from '../shared/components/list-component/list.component';
import { DisplayComponent } from '../shared/components/display-component/display.component';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
  standalone: true,
  imports: [IonicModule, ListComponent, DisplayComponent]
})
export class IncomePage implements OnInit {

  incomeList: Iincome[] = [];
  entity: string = 'Rendas';
  totalValue: string = 'R$ 2.000,00'

  constructor(private router: Router) { }

  ngOnInit() {
    this.incomeList = [{id: 'Salario', name: 'R$1.500,00'}, {id: 'Poupança', name: 'R$500,00'}] as Iincome[];
  }

  onHome() {
    this.router.navigate(['home']);
  }
}
