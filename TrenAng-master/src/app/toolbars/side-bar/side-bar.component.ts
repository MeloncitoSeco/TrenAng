import { Component, HostListener, OnInit } from '@angular/core';
import { SidenavService } from '../../services/sidenav/sidenav.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FotosComponent } from '../../forum/publications/fotos/fotos.component';
import { PublicationsComponent } from '../../forum/publications/publications.component';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatSidenavModule, FotosComponent, PublicationsComponent, RouterModule, RouterOutlet],

  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent implements OnInit {
  isOpen = false; // Estado local

  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {
    // Suscribirse a los cambios en el estado
    this.sidenavService.isOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  closeSidenav() {
    this.sidenavService.close(); // Cierra el sidenav
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (this.isOpen && !targetElement.closest('.inside') && !targetElement.closest('.toggle-button')) {
      this.sidenavService.close();

    }else if (this.isOpen && targetElement.closest('.btn')) {
      this.sidenavService.close();
    }
  }
}
