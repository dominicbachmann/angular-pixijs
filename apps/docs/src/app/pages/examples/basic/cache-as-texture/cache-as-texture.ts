import { extend, PIXI } from 'core';
import { Container, Sprite, Texture } from 'pixi.js';
import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { monstersSpriteSheet } from '../../../../pixi-utils/textures';

extend({
  'pixi-sprite': Sprite,
  'pixi-container': Container,
});

@Component({
  templateUrl: 'cache-as-texture.ng.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CacheAsTextureScene {
  protected readonly app = inject(PIXI);

  readonly alienContainer = viewChild<ElementRef<Container>>('alienContainer');
  readonly monsters = monstersSpriteSheet();

  readonly alienFrames = [
    'eggHead.png',
    'flowerTop.png',
    'helmlok.png',
    'skully.png',
  ] as const;
  readonly containerPosition = signal({
    x: this.app.screen.width / 2,
    y: this.app.screen.height / 2,
    rotation: 0,
  });

  aliens = computed(() => {
    if (!this.monsters()) return;
    return new Array(100).fill(0).map((_, i) => {
      const frameName = this.alienFrames[i % 4];

      return signal({
        tint: Math.random() * 0xffffff,
        x: Math.random() * this.app.screen.width - this.app.screen.width / 2,
        y: Math.random() * this.app.screen.height - this.app.screen.height / 2,
        anchor: 0.5,
        texture: Texture.from(frameName),
        rotation: 0,
      });
    });
  });

  constructor() {
    this.app.stage.eventMode = 'static';

    // Combines both mouse click + touch tap
    this.app.stage.on('pointertap', () => {
      const container = this.alienContainer()?.nativeElement;
      if (!container) return;
      container.cacheAsTexture(!container.isCachedAsTexture);
    });

    let count = 0;
    this.app.ticker.add(() => {
      const aliens = this.aliens();
      if (!aliens) return;

      aliens.forEach(alien => {
        alien.update(alien => ({
          ...alien,
          rotation: alien.rotation + 0.1,
        }));
      });

      count += 0.01;

      this.containerPosition.update(current => ({
        ...current,
        scale: {
          x: Math.sin(count),
          y: Math.sin(count),
        },
        rotation: current.rotation + 0.01,
      }));
    });
  }
}
