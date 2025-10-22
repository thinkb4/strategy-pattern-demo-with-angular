import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/page-without-strategy/page-without-strategy.page')
        .then(m => m.PageWithoutStrategyPage),
  },
  {
    path: 'with-strategy',
    loadComponent: () =>
      import('./features/page-with-strategy/page-with-strategy.page')
        .then(m => m.PageWithStrategyPage),
  },
  { path: '**', redirectTo: '' },
];