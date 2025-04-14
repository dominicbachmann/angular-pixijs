import { Routes } from '@angular/router';
import { ExampleOnlyPage } from '../../example-only-page';
import { HEADER, PIXI_EXAMPLE } from '../../tokens';
import { ContainerApplication } from './container-application';
// eslint-disable-next-line
// @ts-expect-error
import tsContents from './container.ts' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import htmlContents from './container.ng.html' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import applicationTsContents from './container-application.ts' with { loader: 'text' };

const title = 'Container';

export const containerRoutes = [
  {
    path: '',
    providers: [
      {
        provide: PIXI_EXAMPLE,
        useValue: {
          application: ContainerApplication,
          code: {
            HTML: htmlContents,
            TypeScript: tsContents,
            Application: applicationTsContents,
          },
        },
      },
      {
        provide: HEADER,
        useValue: title,
      },
    ],
    component: ExampleOnlyPage,
    data: {
      title,
    },
  },
] as const satisfies Routes;

export default containerRoutes;
