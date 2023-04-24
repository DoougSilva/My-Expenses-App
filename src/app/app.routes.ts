import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'income',
    loadComponent: () => import('./income/income.page').then( m => m.IncomePage)
  },
  {
    path: 'expenses',
    loadComponent: () => import('./expenses-group/expenses/expenses.page').then( m => m.ExpensesPage)
  },
  {
    path: 'expenses-group',
    loadComponent: () => import('./expenses-group/expenses-group.page').then( m => m.ExpensesGroupPage)
  }
];
