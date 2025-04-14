import { Routes } from '@angular/router';
import { ExampleOnlyPage } from '../../example-only-page';
import { HEADER, PIXI_EXAMPLE } from '../../tokens';
import { MeshPlaneApplication } from './mesh-plane-application';
// eslint-disable-next-line
// @ts-expect-error
import tsContents from './mesh-plane.ts' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import htmlContents from './mesh-plane.ng.html' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import applicationTsContents from './mesh-plane-application.ts' with { loader: 'text' };

export const meshPlaneRoutes = [
  {
    path: '',
    providers: [
      {
        provide: PIXI_EXAMPLE,
        useValue: {
          application: MeshPlaneApplication,
          code: {
            HTML: htmlContents,
            TypeScript: tsContents,
            Application: applicationTsContents,
          },
        },
      },
      {
        provide: HEADER,
        useValue: 'Mesh Plane',
      },
    ],
    component: ExampleOnlyPage,
  },
] as const satisfies Routes;

export default meshPlaneRoutes;
