import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  ElementRef,
  HostBinding,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { extend, PIXI } from 'core';
import { Container, Sprite, Ticker } from 'pixi.js';
import { bunnyTexture } from '../../../../pixi-utils/textures';

extend({
  'pixi-sprite': Sprite,
  'pixi-container': Container,
});

@Component({
  templateUrl: './dvd-bunnies.ng.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DvdBunniesScene {
  @HostBinding('pixiProperties')
  get hostProperties() {
    return this.position();
  }

  readonly bunnyTexture = bunnyTexture();

  readonly position = signal({ x: 0, y: 0 });
  private verticalDirection: 'up' | 'down' = 'down';
  private horizontalDirection: 'right' | 'left' = 'right';
  readonly bunnies = [0, 20, 40, 60, 80] as const;
  readonly container = viewChild<ElementRef<Container>>('bunniesContainer');

  private readonly app = inject(PIXI);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    const moveBunnies = this.moveBunniesContainer.bind(this);
    this.app.ticker.add(moveBunnies);
    this.destroyRef.onDestroy(() => this.app.ticker.remove(moveBunnies));
  }

  private moveBunniesContainer(ticker: Ticker) {
    const container = this.container()?.nativeElement;
    if (!container) return;
    const SPEED = 2;
    const containerPosition = this.position();

    if (
      this.verticalDirection === 'down' &&
      containerPosition.y >= this.app.canvas.height - container.height
    ) {
      this.verticalDirection = 'up';
    } else if (this.verticalDirection === 'up' && containerPosition.y <= 0) {
      this.verticalDirection = 'down';
    }

    if (
      this.horizontalDirection === 'right' &&
      containerPosition.x >= this.app.canvas.width - container.width
    ) {
      this.horizontalDirection = 'left';
    } else if (this.horizontalDirection === 'left' && containerPosition.x <= 0) {
      this.horizontalDirection = 'right';
    }

    this.position.update(({ x, y }) => ({
      x: x + (this.horizontalDirection === 'right' ? 1 : -1) * SPEED * ticker.deltaTime,
      y: y + (this.verticalDirection === 'up' ? -1 : 1) * SPEED * ticker.deltaTime,
    }));
  }
}
