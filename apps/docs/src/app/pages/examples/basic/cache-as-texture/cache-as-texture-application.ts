import { Component } from '@angular/core';
import { PixiApplication } from 'core';
import { CacheAsTextureScene } from './cache-as-texture';

@Component({
  imports: [PixiApplication],
  template: ` <pixi-application [scene]="Scene" [initOptions]="{ background: '#1099bb' }" /> `,
})
export class CacheAsTextureApplication {
  readonly Scene = CacheAsTextureScene;
}
