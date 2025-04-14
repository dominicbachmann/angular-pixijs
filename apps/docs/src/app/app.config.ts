import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TUI_DOC_LOGO, TUI_DOC_PAGES, TUI_DOC_TITLE } from '@taiga-ui/addon-doc';
import { pages } from './pages';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { AppLogo } from './app-logo';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    // provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideEventPlugins(),
    {
      provide: TUI_DOC_TITLE,
      useValue: '@ngx-pixijs: ',
    },
    {
      provide: TUI_DOC_PAGES,
      useValue: pages,
    },
    {
      provide: TUI_DOC_LOGO,
      useValue: new PolymorpheusComponent(AppLogo),
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core' as string),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript' as string),
          css: () => import('highlight.js/lib/languages/css' as string),
          html: () => import('highlight.js/lib/languages/xml' as string),
        },
      },
    },
  ],
};
