import { Component } from '@angular/core';
import { PixiApplication } from 'core';
import { DvdBunniesScene } from './dvd-bunnies';

@Component({
  imports: [PixiApplication],
  template: ` <pixi-application [scene]="Scene" [initOptions]="{ background: '#1099bb' }" /> `,
})
export class DvdBunniesApplication {
  readonly Scene = DvdBunniesScene;
}
