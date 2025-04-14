import { Component } from '@angular/core';
import { PixiApplication } from 'core';
import { MeshPlaneScene } from './mesh-plane';

@Component({
  imports: [PixiApplication],
  template: `
    <pixi-application [scene]="Scene" [initOptions]="{ backgroundColor: '#1099bb' }" />
  `,
})
export class MeshPlaneApplication {
  readonly Scene = MeshPlaneScene;
}
