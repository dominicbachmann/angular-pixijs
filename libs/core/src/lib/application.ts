import {
  afterNextRender,
  Component,
  createEnvironmentInjector,
  ElementRef,
  EnvironmentInjector,
  inject,
  InjectionToken,
  Injector,
  input,
  RendererFactory2,
  Type,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { Application } from 'pixi.js';
import { PixiRendererFactory } from './renderer';

export const PIXI = new InjectionToken<Application>('PIXI');

@Component({
  selector: 'pixi-application',
  template: `<canvas #appContainer></canvas> `,
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

  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly injector = inject(Injector);
  private readonly vcr = inject(ViewContainerRef);

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('appContainer');
  private readonly appContainer = viewChild.required('appContainer', {
    read: ViewContainerRef,
  });

  private readonly app = new Application();

  constructor() {
    afterNextRender(async () => {
      const canvas = this.canvas();

      await this.app.init({
        resizeTo: this.vcr.element.nativeElement,
        canvas: canvas.nativeElement,
      });

      const container = this.appContainer();
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

      container.createComponent(this.scene(), {
        environmentInjector,
        injector: this.injector,
      });
    });
  }
}
