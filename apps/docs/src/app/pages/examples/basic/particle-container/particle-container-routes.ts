import { Routes } from '@angular/router';
import { ExampleOnlyPage } from '../../example-only-page';
import { HEADER, PIXI_EXAMPLE } from '../../tokens';
import { ParticleContainerApplication } from './particle-container-application';
// eslint-disable-next-line
// @ts-expect-error
import tsContents from './particle-container.ts' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import htmlContents from './particle-container.ng.html' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import applicationTsContents from './particle-container-application.ts' with { loader: 'text' };

export const particleContainerRoutes = [
  {
    path: '',
    providers: [
      {
        provide: PIXI_EXAMPLE,
        useValue: {
          application: ParticleContainerApplication,
          code: {
            HTML: htmlContents,
            TypeScript: tsContents,
            Application: applicationTsContents,
          },
        },
      },
      {
        provide: HEADER,
        useValue: 'Particle Container',
      },
    ],
    component: ExampleOnlyPage,
  },
] as const satisfies Routes;

export default particleContainerRoutes;
