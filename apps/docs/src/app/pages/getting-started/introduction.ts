import { Component } from '@angular/core';
import { TuiDocPage } from '@taiga-ui/addon-doc';
import { TuiNotification } from '@taiga-ui/core';

@Component({
  imports: [TuiDocPage, TuiNotification],
  template: `
    <tui-doc-page [header]="'Introduction'">
      <tui-notification appearance="warning">
        <code>{{ '@' }}ngx/pixijs</code> has not been released just yet.
      </tui-notification>
      <section class="tui-text_body-l" style="margin-top: 24px;">
        <p>
          <code>{{ '@' }}ngx/pixijs</code> is an Angular library for
          <a href="https://pixijs.com/" target="_blank">PixiJS</a>. It provides a custom
          renderer as well as helpers to work with PixiJS in Angular.
        </p>
      </section>
    </tui-doc-page>
  `,
})
export class Introduction {}

export default Introduction;
