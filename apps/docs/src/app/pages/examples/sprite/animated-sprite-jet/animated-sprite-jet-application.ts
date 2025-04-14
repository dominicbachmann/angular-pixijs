import { Component } from '@angular/core';
import { PixiApplication } from 'core';
import { AnimatedSpriteJetScene } from './animated-sprite-jet';

@Component({
  imports: [PixiApplication],
  template: ` <pixi-application [scene]="Scene" [initOptions]="{ background: '#1099bb' }" /> `,
})
export class AnimatedSpriteJetApplication {
  readonly Scene = AnimatedSpriteJetScene;
}
