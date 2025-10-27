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
  {
    path: 'strategy-switcher',
    loadComponent: () =>
      import('@/app/features/page-strategy-switcher/page-strategy-switcher.page')
        .then(m => m.PageStrategySwitcherPage),
  },
  { path: '**', redirectTo: '' },
];