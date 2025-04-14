import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { extend, PIXI, PixiArgs } from 'core';
import { AnimatedSprite, Assets, Texture } from 'pixi.js';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

extend({
  'pixi-animated-sprite': AnimatedSprite,
});

@Component({
  templateUrl: './animated-sprite-jet.ng.html',
  imports: [PixiArgs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AnimatedSpriteJetScene {
  private app = inject(PIXI);

  jetSpriteSheet = toSignal(
    fromPromise(Assets.load<Texture>('https://pixijs.com/assets/spritesheet/fighter.json'))
  );
  x = this.app.screen.width / 2;
  y = this.app.screen.height / 2;
  anchor = 0.5;
  animationSpeed = 0.5;
  rotation = signal(0);

  jetSpriteFrames = computed(() => {
    const animSpriteTexture = this.jetSpriteSheet();
    if (!animSpriteTexture) return;
    return new Array(30).fill(1).map((_, i) => {
      const val = i < 10 ? `0${i}` : i;
      return Texture.from(`rollSequence00${val}.png`);
    });
  });

  jetSpriteArgs = computed(() => {
    const frames = this.jetSpriteFrames();
    if (!frames) return;
    return [
      {
        textures: frames,
      },
    ];
  });

  jet = viewChild<ElementRef<AnimatedSprite>>('jet');

  constructor() {
    effect(() => {
      this.jet()?.nativeElement.play();
    });
    this.app.ticker.add(() => {
      const jet = this.jet()?.nativeElement;
      if (!jet) return;
      this.rotation.update(rotation => rotation + 0.01);
    });
  }
}
