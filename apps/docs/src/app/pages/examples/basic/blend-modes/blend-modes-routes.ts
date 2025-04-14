import { Routes } from '@angular/router';
import { ExampleOnlyPage } from '../../example-only-page';
import { HEADER, PIXI_EXAMPLE } from '../../tokens';
import { BlendModesApplication } from './blend-modes-application';
// eslint-disable-next-line
// @ts-expect-error
import tsContents from './blend-modes.ts' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import htmlContents from './blend-modes.ng.html' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import applicationTsContents from './blend-modes-application.ts' with { loader: 'text' };

export const blendModesRoutes = [
  {
    path: '',
    providers: [
      {
        provide: PIXI_EXAMPLE,
        useValue: {
          application: BlendModesApplication,
          code: {
            HTML: htmlContents,
            TypeScript: tsContents,
            Application: applicationTsContents,
          },
        },
      },
      {
        provide: HEADER,
        useValue: 'Blend Modes',
      },
    ],
    component: ExampleOnlyPage,
  },
] as const satisfies Routes;

export default blendModesRoutes;
