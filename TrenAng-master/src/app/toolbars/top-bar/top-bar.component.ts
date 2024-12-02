import { Component, inject } from '@angular/core';
import { SidenavService } from '../../services/sidenav/sidenav.service'; // Ajusta la ruta según tu estructura
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemesService } from '../../services/themes/themes.service';
import { ThemeChangerComponent } from '../theme-changer/theme-changer.component'
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, ThemeChangerComponent, CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  private _snackBar = inject(MatSnackBar);

  showCopiedPopup = false;
  constructor(private sidenavService: SidenavService, private router: Router){ }

  toggleSidenav() {
    this.sidenavService.toggle(); // Llama al método toggle del servicio
  }

  goLogin(){
    this.router.navigate(['/login']);
  }
  

  copyUrlToClipboard(): void {
    const currentUrl = window.location.href; // Obtén la URL actual
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        this.openSnackBar('Ruta copiada a portapapeles','Ok');
      })
      .catch((err) => {
        console.error('Error al copiar la URL: ', err);
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 1000,});
  }
}