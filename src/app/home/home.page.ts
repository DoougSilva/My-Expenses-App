import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DisplayComponent } from '../shared/components/display-component/display.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, DisplayComponent],
})
export class HomePage {
  entity: string = 'Saldo';
  totalValue: string = 'R$ 2.000,00'

  constructor(private router: Router) {}

  onIncome() {
    this.router.navigate(['income']);
  }

  onExpensesGroup() {
    this.router.navigate(['expenses-group']);
  }
}
