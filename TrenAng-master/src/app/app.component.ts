import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToolbarsComponent} from "./toolbars/toolbars.component";
import { MainPageComponent } from "./main-page/main-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarsComponent,MainPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TrenAng';
  
}
