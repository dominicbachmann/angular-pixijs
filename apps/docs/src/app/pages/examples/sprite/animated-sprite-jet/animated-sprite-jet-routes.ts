import { Routes } from '@angular/router';
import { ExampleOnlyPage } from '../../example-only-page';
import { HEADER, PIXI_EXAMPLE } from '../../tokens';
import { AnimatedSpriteJetApplication } from './animated-sprite-jet-application';
// eslint-disable-next-line
// @ts-expect-error
import tsContents from './animated-sprite-jet.ts' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import htmlContents from './animated-sprite-jet.ng.html' with { loader: 'text' };
// eslint-disable-next-line
// @ts-expect-error
import applicationTsContents from './animated-sprite-jet-application.ts' with { loader: 'text' };

export const animatedSpriteJetRoutes = [
  {
    path: '',
    providers: [
      {
        provide: PIXI_EXAMPLE,
        useValue: {
          application: AnimatedSpriteJetApplication,
          code: {
            HTML: htmlContents,
            TypeScript: tsContents,
            Application: applicationTsContents,
          },
        },
      },
      {
        provide: HEADER,
        useValue: 'Animated Sprite Jet',
      },
    ],
    component: ExampleOnlyPage,
  },
] as const satisfies Routes;

export default animatedSpriteJetRoutes;
