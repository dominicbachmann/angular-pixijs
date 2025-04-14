import { Routes } from '@angular/router';
import { ExampleOnlyPage } from '../../example-only-page';
import { HEADER, PIXI_EXAMPLE } from '../../tokens';
import { TransparentBackgroundApplication } from './transparent-background-application';
// eslint-disable-next-line
// @ts-expect-error
import tsContents from './transparent-background.ts' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import htmlContents from './transparent-background.ng.html' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import applicationTsContents from './transparent-background-application.ts' with { loader: 'text' };

const title = 'Transparent Background';

export const transparentBackgroundRoutes = [
  {
    path: '',
    providers: [
      {
        provide: PIXI_EXAMPLE,
        useValue: {
          application: TransparentBackgroundApplication,
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

export default transparentBackgroundRoutes;
