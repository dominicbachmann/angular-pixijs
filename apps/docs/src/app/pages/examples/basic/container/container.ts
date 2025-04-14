import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { extend, PIXI } from 'core';
import { Container as PixiContainer, Sprite, Ticker } from 'pixi.js';
import { bunnyTexture } from '../../../../pixi-utils/textures';

extend({
  'pixi-container': PixiContainer,
  'pixi-sprite': Sprite,
});

@Component({
  templateUrl: './container.ng.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContainerScene {
  readonly app = inject(PIXI);

  readonly bunnyTexture = bunnyTexture();

  readonly bunnies = new Array(25).fill(0).map((_, i) => {
    const x = (i % 5) * 40;
    const y = Math.floor(i / 5) * 40;

    return {
      x,
      y,
      key: `${x},${y}`,
    };
  });

  readonly container = viewChild<ElementRef<PixiContainer>>('container');

  constructor() {
    effect(onCleanup => {
      const container = this.container()?.nativeElement;
      if (!container) return;
      container.x = this.app.screen.width / 2;
      container.y = this.app.screen.height / 2;

      container.pivot.x = container.width / 2;
      container.pivot.y = container.height / 2;

      const cb = (time: Ticker) => {
        container.rotation -= 0.01 * time.deltaTime;
      };

      this.app.ticker.add(cb);
      onCleanup(() => this.app.ticker.remove(cb));
    });
  }
}
