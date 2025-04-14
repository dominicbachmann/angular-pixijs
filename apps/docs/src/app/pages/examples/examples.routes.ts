import { Routes } from '@angular/router';

export const examplesRoutes = [
  {
    path: 'basic',
    children: [
      {
        path: 'container',
        loadChildren: () => import('./basic/container/container-routes'),
      },
      {
        path: 'transparent-background',
        loadChildren: () =>
          import('./basic/transparent-background/transparent-background-routes'),
      },
      {
        path: 'tinting',
        loadChildren: () => import('./basic/tinting/tinting-routes'),
      },
      {
        path: 'particle-container',
        loadChildren: () => import('./basic/particle-container/particle-container-routes'),
      },
      {
        path: 'blend-modes',
        loadChildren: () => import('./basic/blend-modes/blend-modes-routes'),
      },
      {
        path: 'mesh-plane',
        loadChildren: () => import('./basic/mesh-plane/mesh-plane-routes'),
      },
      {
        path: 'render-group',
        loadChildren: () => import('./basic/render-group/render-group-routes'),
      },
      {
        path: 'cache-as-texture',
        loadChildren: () => import('./basic/cache-as-texture/cache-as-texture-routes'),
      },
    ],
  },
  {
    path: 'sprite',
    children: [
      {
        path: 'animated-sprite-jet',
        loadChildren: () => import('./sprite/animated-sprite-jet/animated-sprite-jet-routes'),
      },
    ],
  },
  {
    path: 'other',
    children: [
      {
        path: 'dvd-bunnies',
        loadChildren: () => import('./other/dvd-bunnies/dvd-bunnies-routes'),
      },
    ],
  },
] as const satisfies Routes;

export default examplesRoutes;
