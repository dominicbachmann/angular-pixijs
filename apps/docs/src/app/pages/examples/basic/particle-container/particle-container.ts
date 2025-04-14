import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { extend, PIXI } from 'core';
import { Container, Rectangle, Sprite } from 'pixi.js';
import { maggotTexture } from '../../../../pixi-utils/textures';

extend({
  'pixi-sprite': Sprite,
  'pixi-container': Container,
});

@Component({
  templateUrl: './particle-container.ng.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ParticleContainerScene {
  readonly app = inject(PIXI);

  readonly texture = maggotTexture();

  maggots = new Array(10000).fill(0).map(() => {
    return signal({
      anchor: 0.5,
      scale: {
        x: 0.8 + Math.random() * 0.3,
        y: 0.8 + Math.random() * 0.3,
      },
      x: Math.random() * this.app.screen.width,
      y: Math.random() * this.app.screen.height,
      tint: Math.random() * 0x808080,
      direction: Math.random() * Math.PI * 2,
      turningSpeed: Math.random() - 0.8,
      speed: (2 + Math.random() * 2) * 0.2,
      offset: Math.random() * 100,
      rotation: 0,
    });
  });

  constructor() {
    const maggotBoundsPadding = 100;
    const maggotBounds = new Rectangle(
      -maggotBoundsPadding,
      -maggotBoundsPadding,
      this.app.screen.width + maggotBoundsPadding * 2,
      this.app.screen.height + maggotBoundsPadding * 2
    );

    let tick = 0;

    this.app.ticker.add(() => {
      this.maggots.forEach(maggotSignal => {
        maggotSignal.update(maggot => {
          maggot.scale.y = 0.95 + Math.sin(tick + maggot.offset) * 0.05;
          maggot.direction += maggot.turningSpeed * 0.01;
          maggot.x += Math.sin(maggot.direction) * (maggot.speed * maggot.scale.y);
          maggot.y += Math.cos(maggot.direction) * (maggot.speed * maggot.scale.y);
          maggot.rotation = -maggot.direction + Math.PI;

          if (maggot.x < maggotBounds.x) {
            maggot.x += maggotBounds.width;
          } else if (maggot.x > maggotBounds.x + maggotBounds.width) {
            maggot.x -= maggotBounds.width;
          }

          if (maggot.y < maggotBounds.y) {
            maggot.y += maggotBounds.height;
          } else if (maggot.y > maggotBounds.y + maggotBounds.height) {
            maggot.y -= maggotBounds.height;
          }

          return {
            ...maggot,
          };
        });
      });
      tick += 0.1;
    });
  }
}
