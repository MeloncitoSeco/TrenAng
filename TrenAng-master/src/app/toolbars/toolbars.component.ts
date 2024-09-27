import { Component } from '@angular/core';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ThemesService } from '../services/themes/themes.service';

@Component({
  selector: 'app-toolbars-component',
  standalone: true,
  imports: [TopBarComponent, SideBarComponent],
  template: `
    <app-top-bar></app-top-bar>
    <app-side-bar></app-side-bar>
  `,
})
export class ToolbarsComponent {
  
}
