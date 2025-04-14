import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { extend, PIXI, PixiArgs } from 'core';
import { Container, Sprite } from 'pixi.js';
import { treeTexture } from '../../../../pixi-utils/textures';

extend({
  'pixi-sprite': Sprite,
  'pixi-container': Container,
});

@Component({
  templateUrl: './render-group.ng.html',
  imports: [PixiArgs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RenderGroupScene {
  private readonly app = inject(PIXI);
  protected readonly treeTexture = treeTexture();
  private readonly worldSize = 5000;
  protected readonly trees = new Array(100000)
    .fill(0)
    .map(() => {
      return {
        x: Math.random() * this.worldSize,
        y: Math.random() * this.worldSize,
        scale: 0.25,
        anchor: 0.5,
      };
    })
    .sort((a, b) => a.y - b.y);

  readonly worldContainer = viewChild<ElementRef<Container>>('worldContainer');

  constructor() {
    let x = 0;
    let y = 0;

    this.app.canvas.addEventListener('mousemove', e => {
      x = e.clientX;
      y = e.clientY;
    });

    this.app.ticker.add(() => {
      const screenWidth = this.app.renderer.width;
      const screenHeight = this.app.renderer.height;

      const targetX = (x / screenWidth) * (this.worldSize - screenWidth);
      const targetY = (y / screenHeight) * (this.worldSize - screenHeight);

      const worldContainer = this.worldContainer()?.nativeElement;

      if (worldContainer) {
        worldContainer.x += (-targetX - worldContainer.x) * 0.1;
        worldContainer.y += (-targetY - worldContainer.y) * 0.1;
      }
    });
  }
}
