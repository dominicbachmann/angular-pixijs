import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { extend, PIXI } from 'core';
import { Sprite, Container, Text } from 'pixi.js';
import { pandaTexture, rainbowTexture } from '../../../../pixi-utils/textures';
import 'pixi.js/advanced-blend-modes';

extend({
  'pixi-sprite': Sprite,
  'pixi-container': Container,
  'pixi-text': Text,
});

const allBlendModes = [
  'normal',
  'add',
  'screen',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'linear-burn',
  'linear-dodge',
  'linear-light',
  'hard-light',
  'soft-light',
  'pin-light',
  'difference',
  'exclusion',
  'overlay',
  'saturation',
  'color',
  'luminosity',
  'add-npm',
  'subtract',
  'divide',
  'vivid-light',
  'hard-mix',
  'negation',
];

@Component({
  templateUrl: './blend-modes.ng.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BlendModesScene {
  readonly app = inject(PIXI);

  readonly pandaTexture = pandaTexture();
  readonly rainbowTexture = rainbowTexture();

  readonly size = 800 / 5;

  readonly pandas = signal(
    allBlendModes.map((blendMode, i) => {
      return {
        x: (i % 5) * this.size,
        y: Math.floor(i / 5) * this.size,
        blendMode,
        rotation: 0,
      };
    })
  );

  constructor() {
    this.app.ticker.add(() => {
      this.pandas.update(pandas =>
        pandas.map((panda, i) => {
          return {
            ...panda,
            rotation: (panda.rotation += 0.01 * (i % 2 ? 1 : -1)),
          };
        })
      );
    });
  }
}
