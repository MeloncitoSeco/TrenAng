import { Component } from '@angular/core';
import { ThemesService } from '../../services/themes/themes.service';

@Component({
  selector: 'app-theme-changer',
  standalone: true,
  imports: [],
  templateUrl: './theme-changer.component.html',
  styleUrl: './theme-changer.component.scss'
})
export class ThemeChangerComponent {
  constructor(private themesService: ThemesService) {}

  toggleTheme() {
    const currentTheme = this.themesService.getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.themesService.setTheme(newTheme);
  }
}