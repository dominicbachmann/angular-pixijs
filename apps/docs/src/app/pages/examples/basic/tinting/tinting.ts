import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { extend, PIXI } from 'core';
import { Rectangle, Sprite } from 'pixi.js';
import { eggHeadTexture } from '../../../../pixi-utils/textures';

extend({
  'pixi-sprite': Sprite,
});

@Component({
  templateUrl: './tinting.ng.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TintingScene {
  readonly app = inject(PIXI);

  readonly eggHead = eggHeadTexture();

  aliens = new Array(20).fill(0).map(() => {
    return signal({
      anchor: 0.5,
      scale: 0.8 + Math.random() * 0.3,
      x: Math.random() * this.app.screen.width,
      y: Math.random() * this.app.screen.height,
      tint: Math.random() * 0xffffff,
      direction: Math.random() * Math.PI * 2,
      turningSpeed: Math.random() - 0.8,
      speed: 2 + Math.random() * 2,
      rotation: 0,
    });
  });

  constructor() {
    const alienBoundsPadding = 100;
    const alienBounds = new Rectangle(
      -alienBoundsPadding,
      -alienBoundsPadding,
      this.app.screen.width + alienBoundsPadding * 2,
      this.app.screen.height + alienBoundsPadding * 2
    );
    this.app.ticker.add(() => {
      this.aliens.forEach(alienSignal => {
        alienSignal.update(alien => {
          alien.direction += alien.turningSpeed * 0.01;
          alien.x += Math.sin(alien.direction) * alien.speed;
          alien.y += Math.cos(alien.direction) * alien.speed;
          alien.rotation = -alien.direction - Math.PI / 2;

          if (alien.x < alienBounds.x) {
            alien.x += alienBounds.width;
          } else if (alien.x > alienBounds.x + alienBounds.width) {
            alien.x -= alienBounds.width;
          }

          if (alien.y < alienBounds.y) {
            alien.y += alienBounds.height;
          } else if (alien.y > alienBounds.y + alienBounds.height) {
            alien.y -= alienBounds.height;
          }

          return {
            ...alien,
          };
        });
      });
    });
  }
}
