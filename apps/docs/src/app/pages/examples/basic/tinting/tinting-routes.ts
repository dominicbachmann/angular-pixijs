import { Routes } from '@angular/router';
import { ExampleOnlyPage } from '../../example-only-page';
import { HEADER, PIXI_EXAMPLE } from '../../tokens';
import { TintingApplication } from './tinting-application';
// eslint-disable-next-line
// @ts-expect-error
import tsContents from './tinting.ts' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import htmlContents from './tinting.ng.html' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import applicationTsContents from './tinting-application.ts' with { loader: 'text' };

export const tintingRoutes = [
  {
    path: '',
    providers: [
      {
        provide: PIXI_EXAMPLE,
        useValue: {
          application: TintingApplication,
          code: {
            HTML: htmlContents,
            TypeScript: tsContents,
            Application: applicationTsContents,
          },
        },
      },
      {
        provide: HEADER,
        useValue: 'Tinting',
      },
    ],
    component: ExampleOnlyPage,
  },
] as const satisfies Routes;

export default tintingRoutes;
