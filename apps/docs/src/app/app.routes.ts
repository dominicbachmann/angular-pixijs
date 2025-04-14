import { Routes } from '@angular/router';

/**
 * Landing page: A nice/cool/funny scene to make a good first impression
 *
 * At first maybe a nice/cool
 */

export const routes: Routes = [
  {
    path: 'examples',
    loadChildren: () => import('./pages/examples/examples.routes'),
  },
  {
    path: 'getting-started/introduction',
    loadComponent: () => import('./pages/getting-started/introduction'),
    data: {
      title: 'Introduction',
    },
  },
  {
    path: '',
    redirectTo: 'getting-started/introduction',
    pathMatch: 'full',
  },
];
