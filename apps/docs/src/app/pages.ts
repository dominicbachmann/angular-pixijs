import type { TuiDocRoutePage, TuiDocRoutePageBase } from '@taiga-ui/addon-doc';

export type DocRoutePages = readonly (TuiDocRoutePage | DocRoutePageGroup)[];

export type DocRoutePageGroup = TuiDocRoutePageBase & {
  readonly subPages: readonly TuiDocRoutePage[];
};

export const pages: DocRoutePages = [
  {
    section: 'Getting Started',
    title: 'Introduction',
    route: '/getting-started/introduction',
  },
  {
    section: 'Examples',
    title: 'Basic',
    subPages: [
      {
        title: 'Container',
        route: '/examples/basic/container',
      },
      {
        route: '/examples/basic/transparent-background',
        title: 'Transparent Background',
      },
      {
        route: '/examples/basic/tinting',
        title: 'Tinting',
      },
      {
        route: '/examples/basic/particle-container',
        title: 'Particle Container',
      },
      {
        route: '/examples/basic/blend-modes',
        title: 'Blend Modes',
      },
      {
        route: '/examples/basic/mesh-plane',
        title: 'Mesh Plane',
      },
      {
        route: '/examples/basic/render-group',
        title: 'Render Group',
      },
      {
        route: '/examples/basic/cache-as-texture',
        title: 'Cache As Texture',
      },
    ],
  },
  {
    section: 'Examples',
    title: 'Sprite',
    subPages: [
      {
        title: 'Animated Sprite Jet',
        route: '/examples/sprite/animated-sprite-jet',
      },
    ],
  },
  {
    section: 'Examples',
    title: 'Other',
    subPages: [
      {
        title: 'DVD Bunnies',
        route: '/examples/other/dvd-bunnies',
      },
    ],
  },
] as const;
