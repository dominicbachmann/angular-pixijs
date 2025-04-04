import {
  createEnvironmentInjector,
  Directive,
  EnvironmentInjector,
  inject,
  InjectOptions,
  ProviderToken,
  RendererFactory2,
  runInInjectionContext,
} from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

class PixiOutletEnvironmentInjector extends EnvironmentInjector {
  constructor(
    private readonly routeEnvInjector: EnvironmentInjector,
    private readonly ngpEnvInjector: EnvironmentInjector
  ) {
    super();
  }

  override get<T>(
    token: ProviderToken<T>,
    notFoundValue?: T,
    flags?: InjectOptions
  ): T | null {
    if (token === RendererFactory2) {
      return this.ngpEnvInjector.get<T>(token, notFoundValue, flags);
    }

    return this.routeEnvInjector.get<T>(token, notFoundValue, flags);
  }

  override runInContext<ReturnT>(fn: () => ReturnT): ReturnT {
    try {
      return runInInjectionContext(this.routeEnvInjector, fn);
    } catch {
      /* empty */
    }

    return runInInjectionContext(this.ngpEnvInjector, fn);
  }

  override destroy(): void {
    this.routeEnvInjector.destroy();
  }
}

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: 'pixi-router-outlet' })
export class PixiRouterOutlet extends RouterOutlet {
  private environmentInjector = inject(EnvironmentInjector);

  override activateWith(
    activatedRoute: ActivatedRoute,
    environmentInjector: EnvironmentInjector
  ): void {
    const activateWithEnvInjector =
      this.environmentInjector === environmentInjector
        ? environmentInjector
        : createEnvironmentInjector(
            [],
            new PixiOutletEnvironmentInjector(environmentInjector, this.environmentInjector)
          );

    return super.activateWith(activatedRoute, activateWithEnvInjector);
  }
}
