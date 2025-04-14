import { Routes } from '@angular/router';
import { ExampleOnlyPage } from '../../example-only-page';
import { HEADER, PIXI_EXAMPLE } from '../../tokens';
import { DvdBunniesApplication } from './dvd-bunnies-application';
// eslint-disable-next-line
// @ts-expect-error
import tsContents from './dvd-bunnies.ts' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import htmlContents from './dvd-bunnies.ng.html' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import applicationTsContents from './dvd-bunnies-application.ts' with { loader: 'text' };

export const dvdBunniesRoutes = [
  {
    path: '',
    providers: [
      {
        provide: PIXI_EXAMPLE,
        useValue: {
          application: DvdBunniesApplication,
          code: {
            HTML: htmlContents,
            TypeScript: tsContents,
            Application: applicationTsContents,
          },
        },
      },
      {
        provide: HEADER,
        useValue: 'DVD Bunnies',
      },
    ],
    component: ExampleOnlyPage,
  },
] as const satisfies Routes;

export default dvdBunniesRoutes;
