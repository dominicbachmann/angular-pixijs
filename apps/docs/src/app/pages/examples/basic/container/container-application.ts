import { Component } from '@angular/core';
import { PixiApplication } from 'core';
import { ContainerScene } from './container';

@Component({
  imports: [PixiApplication],
  template: ` <pixi-application [scene]="Scene" [initOptions]="{ background: '#1099bb' }" /> `,
})
export class ContainerApplication {
  readonly Scene = ContainerScene;
}
