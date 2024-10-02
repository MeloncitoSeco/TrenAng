import { Component } from '@angular/core';
import { defer } from 'rxjs';
import { PublicationsComponent } from '../../publications/publications.component';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-publications',
  standalone: true,
  imports: [PublicationsComponent],
  templateUrl: './loading-publications.component.html',
  styleUrl: './loading-publications.component.scss'
})
export class LoadingPublicationsComponent {
  imagesAreLoaded: boolean = false;

  onImagesLoaded() {
    this.imagesAreLoaded = true; // Actualizamos cuando todas las imágenes se cargan
  }
}