import { toSignal } from '@angular/core/rxjs-interop';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Assets, Texture } from 'pixi.js';

const loadTexture = (url: string) => toSignal(fromPromise(Assets.load<Texture>(url)));
const createLoadTexture = (url: string) => () => loadTexture(url);

export const bunnyTexture = createLoadTexture('https://pixijs.com/assets/bunny.png');
export const eggHeadTexture = createLoadTexture('https://pixijs.com/assets/eggHead.png');
export const maggotTexture = createLoadTexture('https://pixijs.com/assets/maggot_tiny.png');
export const pandaTexture = createLoadTexture('https://pixijs.com/assets/panda.png');
export const rainbowTexture = createLoadTexture(
  'https://pixijs.com/assets/rainbow-gradient.png'
);
export const grassBgTexture = createLoadTexture('https://pixijs.com/assets/bg_grass.jpg');
export const treeTexture = createLoadTexture('https://pixijs.com/assets/tree.png');
export const monstersSpriteSheet = createLoadTexture(
  'https://pixijs.com/assets/spritesheet/monsters.json'
);
