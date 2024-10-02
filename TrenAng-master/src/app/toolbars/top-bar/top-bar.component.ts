import { Component } from '@angular/core';
import { SidenavService } from '../../services/sidenav/sidenav.service'; // Ajusta la ruta según tu estructura
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemesService } from '../../services/themes/themes.service';
import { ThemeChangerComponent } from '../theme-changer/theme-changer.component'

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, ThemeChangerComponent],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  constructor(private sidenavService: SidenavService) { }

  toggleSidenav() {
    this.sidenavService.toggle(); // Llama al método toggle del servicio
  }
}