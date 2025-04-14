import { Routes } from '@angular/router';
import { ExampleOnlyPage } from '../../example-only-page';
import { HEADER, PIXI_EXAMPLE } from '../../tokens';
import { CacheAsTextureApplication } from './cache-as-texture-application';
// eslint-disable-next-line
// @ts-expect-error
import tsContents from './cache-as-texture.ts' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import htmlContents from './cache-as-texture.ng.html' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import applicationTsContents from './cache-as-texture-application.ts' with { loader: 'text' };

export const cacheAsTextureRoutes = [
  {
    path: '',
    providers: [
      {
        provide: PIXI_EXAMPLE,
        useValue: {
          application: CacheAsTextureApplication,
          code: {
            HTML: htmlContents,
            TypeScript: tsContents,
            Application: applicationTsContents,
          },
        },
      },
      {
        provide: HEADER,
        useValue: 'Cache As Texture',
      },
    ],
    component: ExampleOnlyPage,
  },
] as const satisfies Routes;

export default cacheAsTextureRoutes;
