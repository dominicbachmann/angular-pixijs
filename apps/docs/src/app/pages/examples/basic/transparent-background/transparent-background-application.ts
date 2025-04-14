import { Component } from '@angular/core';
import { PixiApplication } from 'core';
import { TransparentBackgroundScene } from './transparent-background';

@Component({
  imports: [PixiApplication],
  template: ` <pixi-application [scene]="Scene" [initOptions]="{ backgroundAlpha: 0 }" /> `,
})
export class TransparentBackgroundApplication {
  readonly Scene = TransparentBackgroundScene;
}
