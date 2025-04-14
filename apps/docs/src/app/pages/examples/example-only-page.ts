import { Component, inject } from '@angular/core';
import { TuiDocExample, TuiDocPage } from '@taiga-ui/addon-doc';
import { PIXI_EXAMPLE, HEADER } from './tokens';
import { NgComponentOutlet } from '@angular/common';

@Component({
  styles: `
    :host ::ng-deep tui-doc-page tui-doc-example {
      padding-top: 0;
    }
  `,
  imports: [TuiDocExample, TuiDocPage, NgComponentOutlet],
  template: `
    <tui-doc-page [header]="header">
      <tui-doc-example [content]="application.code">
        <ng-container *ngComponentOutlet="application.application" />
      </tui-doc-example>
    </tui-doc-page>
  `,
})
export class ExampleOnlyPage {
  application = inject(PIXI_EXAMPLE);
  header = inject(HEADER);
}
