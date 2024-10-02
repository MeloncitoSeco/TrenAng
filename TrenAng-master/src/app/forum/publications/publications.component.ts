import { Component, HostListener } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.scss'
})
export class PublicationsComponent {
  publicaciones = [
    { pubId: 1, title: 'Tren saliendo', text: 'Los trenes son uno de los medios de transporte más importantes y antiguos del mundo moderno,Los trenes son uno de los medios de transporte más importantes y antiguos del mundo moderno,Los trenes son uno de los medios de transporte más importantes y antiguos del mundo moderno', photo: '1' },
    { pubId: 2, title: 'Tren entrando', text: 'Surgieron durante la Revolución Industrial a principios del siglo XIX', photo: '2'},
    { pubId: 3, title: 'Ta roto', text: 'revolucionando la forma en que las personas y las mercancías se movían', photo: '3'},
    { pubId: 4, title: 'Renfe cabrona', text: 'text', photo: '5'},
    { pubId: 5, title: 'Holiwis', text: 'Originalmente impulsados por máquinas de vapor', photo: '4'},
    
  ];

  trackByPubId(index: number, publicacion: any): number {
    return publicacion.pubId;
  }

  expanded: boolean = false;

  expandDiv(event: MouseEvent) {
    event.stopPropagation(); // Evitar que el evento se propague al document
    this.expanded = true;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (!targetElement.closest('#myDiv')) {
      // Si haces clic fuera del div, vuelve a su tamaño y posición original
      this.expanded = false;
    }
  }
}
