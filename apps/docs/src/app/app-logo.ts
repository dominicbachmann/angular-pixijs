import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiLink } from '@taiga-ui/core';

@Component({
  imports: [RouterLink, TuiLink],
  styles: `
    h5 {
      color: var(--tui-text-primary);
    }
  `,
  template: `
    <a tuiLink routerLink="/">
      <h5 class="tui-text_h5">{{ '@' }}ngx/pixijs</h5>
    </a>
  `,
})
export class AppLogo {}
