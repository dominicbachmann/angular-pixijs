import { InjectionToken, Type } from '@angular/core';

export const PIXI_EXAMPLE = new InjectionToken<{
  application: Type<unknown>;
  code: {
    HTML: string;
    TypeScript: string;
    Application: string;
  };
}>('APPLICATION');
export const HEADER = new InjectionToken<string>('HEADER');
