import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'main', loadComponent: () => import('./views/main/main.component').then(comp => comp.MainComponent) },
  { path: '**', loadComponent: () => import('./views/not-found/not-found.component').then( comp => comp.NotFoundComponent) }
];
