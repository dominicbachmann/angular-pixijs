import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { extend, PIXI } from 'core';
import { Sprite } from 'pixi.js';
import { bunnyTexture } from '../../../../pixi-utils/textures';

extend({
  'pixi-sprite': Sprite,
});

@Component({
  templateUrl: './transparent-background.ng.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TransparentBackgroundScene {
  readonly app = inject(PIXI);

  readonly bunnyTexture = bunnyTexture();

  readonly props = computed(() => {
    const texture = this.bunnyTexture();
    if (!texture) return;
    return {
      texture,
      x: this.app.screen.width / 2,
      y: this.app.screen.height / 2,
      anchor: 0.5,
    };
  });

  readonly rotation = signal(0);

  constructor() {
    this.app.ticker.add(ticker => {
      this.rotation.update(rotation => rotation + 0.1 * ticker.deltaTime);
    });
  }
}
