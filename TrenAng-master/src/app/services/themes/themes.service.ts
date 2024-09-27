// theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  
  private currentTheme = 'light'; // 'default' o 'dark'

  constructor() {}

  setTheme(theme: string) {
    this.currentTheme = theme;
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
    console.log(`${theme}-theme`);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.setTheme(newTheme);
  }

  getTheme() {
    return this.currentTheme;
  }
}