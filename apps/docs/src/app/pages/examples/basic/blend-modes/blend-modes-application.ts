import { Component } from '@angular/core';
import { PixiApplication } from 'core';
import { BlendModesScene } from './blend-modes';

@Component({
  imports: [PixiApplication],
  template: `
    <pixi-application
      [scene]="Scene"
      [initOptions]="{ antialias: true, backgroundColor: 'white', useBackBuffer: true }"
    />
  `,
})
export class BlendModesApplication {
  readonly Scene = BlendModesScene;
}
