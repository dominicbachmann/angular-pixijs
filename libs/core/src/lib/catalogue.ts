import { InjectionToken } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PixiAnyConstructor = new (...args: any[]) => any;

const catalogue: Record<string, PixiAnyConstructor> = {};

export const extend = (objects: object): void => {
  Object.assign(catalogue, objects);
};

export const CATALOGUE = new InjectionToken('PIXI_CATALOGUE', {
  factory: () => catalogue,
});
