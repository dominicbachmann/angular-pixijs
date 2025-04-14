import { Component } from '@angular/core';
import { PixiApplication } from 'core';
import { TintingScene } from './tinting';

@Component({
  imports: [PixiApplication],
  template: ` <pixi-application [scene]="Scene" /> `,
})
export class TintingApplication {
  readonly Scene = TintingScene;
}
