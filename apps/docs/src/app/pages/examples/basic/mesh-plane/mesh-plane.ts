import { extend, PIXI, PixiArgs } from 'core';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { grassBgTexture } from '../../../../pixi-utils/textures';
import { MeshPlane } from 'pixi.js';

extend({
  'pixi-mesh-plane': MeshPlane,
});

@Component({
  templateUrl: './mesh-plane.ng.html',
  imports: [PixiArgs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MeshPlaneScene {
  private readonly app = inject(PIXI);
  readonly grassBg = grassBgTexture();
  readonly plane = viewChild<ElementRef<MeshPlane>>('plane');

  constructor() {
    effect(onCleanup => {
      const plane = this.plane()?.nativeElement;
      if (!plane) return;
      const { buffer } = plane.geometry.getAttribute('aPosition');
      let timer = 0;

      const cb = () => {
        for (let i = 0; i < buffer.data.length; i++) {
          buffer.data[i] += Math.sin(timer / 10 + i) * 0.5;
        }
        buffer.update();
        timer++;
      };

      this.app.ticker.add(cb);

      onCleanup(() => {
        this.app.ticker.remove(cb);
      });
    });
  }
}
