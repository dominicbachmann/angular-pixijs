import { Component } from '@angular/core';
import { TuiButton, TuiIcon, TuiRoot } from '@taiga-ui/core';
import { TuiBadgedContent } from '@taiga-ui/kit';
import { TuiDocMain } from '@taiga-ui/addon-doc';
import { TuiSheetModule } from '@taiga-ui/legacy';

@Component({
  selector: 'app-root',
  imports: [TuiRoot, TuiButton, TuiDocMain, TuiBadgedContent, TuiIcon, TuiSheetModule],
  templateUrl: './app.ng.html',
})
export class App {}
