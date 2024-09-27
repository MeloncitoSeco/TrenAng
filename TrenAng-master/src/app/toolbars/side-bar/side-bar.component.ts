import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../services/sidenav/sidenav.service'; // Ajusta la ruta según tu estructura
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatSidenavModule],
  
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent implements OnInit {
  isOpen = false;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {
    this.sidenavService.isOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen; // Suscribirse a los cambios en el estado
    });
  }
}