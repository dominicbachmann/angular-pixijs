import {
  Component,
  ComponentRef,
  createEnvironmentInjector,
  DestroyRef,
  effect,
  EnvironmentInjector,
  inject,
  InjectionToken,
  Injector,
  input,
  RendererFactory2,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Application, ApplicationOptions } from 'pixi.js';
import { PixiRendererFactory } from './renderer';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export const PIXI = new InjectionToken<Application>('PIXI');

export type NgxPixiApplicationOptions = Partial<ApplicationOptions>;

@Component({
  selector: 'pixi-application',
  template: ``,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class PixiApplication {
  readonly scene = input.required<Type<unknown>>();
  readonly initOptions = input<NgxPixiApplicationOptions>();

  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly injector = inject(Injector);
  private readonly vcr = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  private app = new Application();

  private readonly didInit = new Subject<void>();

  private createdScene: ComponentRef<unknown> | undefined;

  constructor() {
    effect(() => {
      const initOptions = this.initOptions();
      this.createdScene?.destroy();

      // TODO: Find out how to properly reuse canvas

      if (this.app.renderer) {
        this.app.destroy(true);
      }
      this.app = new Application();
      this.app.init(initOptions).then(() => {
        this.didInit.next();
      });
    });

    this.didInit.pipe(takeUntilDestroyed()).subscribe(() => {
      this.vcr.element.nativeElement.appendChild(this.app.canvas);

      const environmentInjector = createEnvironmentInjector(
        [
          PixiRendererFactory,
          {
            provide: RendererFactory2,
            useExisting: PixiRendererFactory,
          },
          {
            provide: PIXI,
            useValue: this.app,
          },
        ],
        this.environmentInjector
      );

      this.createdScene = this.vcr.createComponent(this.scene(), {
        environmentInjector,
        injector: this.injector,
      });
    });

    this.destroyRef.onDestroy(() => {
      try {
        this.app.destroy(true, {
          children: true,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_: unknown) {
        // empty
      }
    });
  }
}
