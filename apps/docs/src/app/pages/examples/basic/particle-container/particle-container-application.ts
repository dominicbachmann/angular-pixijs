import { Component } from '@angular/core';
import { PixiApplication } from 'core';
import { ParticleContainerScene } from './particle-container';

@Component({
  imports: [PixiApplication],
  template: ` <pixi-application [scene]="Scene" /> `,
})
export class ParticleContainerApplication {
  readonly Scene = ParticleContainerScene;
}
