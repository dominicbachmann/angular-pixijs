import { Component } from '@angular/core';
import { PixiApplication } from 'core';
import { RenderGroupScene } from './render-group';

@Component({
  imports: [PixiApplication],
  template: `
    <pixi-application [scene]="Scene" [initOptions]="{ backgroundColor: 'brown' }" />
  `,
})
export class RenderGroupApplication {
  readonly Scene = RenderGroupScene;
}
