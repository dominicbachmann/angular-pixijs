import { Routes } from '@angular/router';
import { ExampleOnlyPage } from '../../example-only-page';
import { HEADER, PIXI_EXAMPLE } from '../../tokens';
import { RenderGroupApplication } from './render-group-application';
// eslint-disable-next-line
// @ts-expect-error
import tsContents from './render-group.ts' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import htmlContents from './render-group.ng.html' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import applicationTsContents from './render-group-application.ts' with { loader: 'text' };

export const renderGroupRoutes = [
  {
    path: '',
    providers: [
      {
        provide: PIXI_EXAMPLE,
        useValue: {
          application: RenderGroupApplication,
          code: {
            HTML: htmlContents,
            TypeScript: tsContents,
            Application: applicationTsContents,
          },
        },
      },
      {
        provide: HEADER,
        useValue: 'Render Group',
      },
    ],
    component: ExampleOnlyPage,
  },
] as const satisfies Routes;

export default renderGroupRoutes;
