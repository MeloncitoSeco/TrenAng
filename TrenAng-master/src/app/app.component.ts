import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToolbarsComponent} from "./toolbars/toolbars.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarsComponent,MainPageComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TrenAng';
  
}
