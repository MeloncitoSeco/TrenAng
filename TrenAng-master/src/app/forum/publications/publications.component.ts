import { Component, EventEmitter, HostListener, Output } from '@angular/core';
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
    { pubId: 2, title: 'Tren entrando', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla rutrum augue ut urna imperdiet pretium. Proin ac arcu velit. Sed nec consectetur tortor, at efficitur ex. Donec eros odio, pharetra at convallis id, dignissim quis urna. Mauris sollicitudin placerat viverra. Curabitur lacus lorem, porttitor ut vestibulum vel, interdum eget elit. Praesent sit amet sapien mi. Praesent in risus ac lectus bibendum facilisis sit amet a odio. Donec augue dolor, viverra nec hendrerit et, laoreet venenatis lacus. Phasellus consectetur et quam a commodo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam est velit, porta non tincidunt sed, imperdiet vel libero. Proin vel urna eget risus viverra pellentesque vel at augue. In sit amet nisi arcu. Mauris in gravida risus. Praesent nulla dui, pellentesque a dolor eu, efficitur blandit massa. Phasellus eu fringilla mauris, id congue urna. Nunc malesuada orci eu magna maximus, feugiat venenatis turpis bibendum. Aliquam in ipsum mollis, venenatis nibh non, pretium tortor. Phasellus vitae tellus elementum, iaculis orci eu, vestibulum ipsum. Ut feugiat augue ut ante gravida, et facilisis risus ornare. Ut feugiat placerat fringilla. Donec at massa lacinia, euismod mi at, auctor neque.Ut pulvinar cursus ante. Ut eu massa sit amet arcu ullamcorper tincidunt nec id est. Nulla a sem nulla. Nulla elementum mollis malesuada. Donec blandit semper justo, vel elementum enim condimentum at. Etiam in neque mi. Aliquam erat volutpat. Praesent vitae fermentum nisl. Duis tempus sed justo quis eleifend. Integer pulvinar eros a consectetur placerat. Vivamus turpis nunc, gravida quis eleifend at, volutpat ac odio. Morbi et purus at lacus eleifend tincidunt. Morbi ante quam, gravida a sem sed, volutpat ultrices sem. Pellentesque ligula magna, laoreet sit amet maximus eget, malesuada quis tortor. In porta consectetur nisl ut rhoncus. Proin pharetra vehicula nisl, eget fermentum erat vestibulum eget. Nulla in dui libero. Nam sit amet eleifend metus, a imperdiet magna. Nunc ut odio sit amet lacus accumsan porttitor quis eu velit.Duis dapibus porttitor erat, id gravida eros sodales nec. Proin laoreet, nisi et molestie mattis, elit neque pulvinar velit, fringilla viverra risus mi eu urna. Integer lacinia lacus at tincidunt laoreet. Donec imperdiet, quam eu porttitor iaculis, nibh mauris commodo elit, nec mattis mi massa non tortor. Vivamus vitae mauris id risus tristique rhoncus ut nec odio. Aenean semper justo ac quam faucibus, et iaculis metus volutpat. Vestibulum mollis accumsan posuere. Phasellus malesuada ut sem eget sollicitudin. Aenean luctus feugiat tellus, quis sagittis arcu finibus ac.', photo: '2' },
    { pubId: 3, title: 'Ta roto', text: 'revolucionando la forma en que las personas y las mercancías se movían', photo: '3' },
    { pubId: 4, title: 'Renfe cabrona', text: 'text', photo: '4' },
    { pubId: 5, title: 'Holiwis', text: 'Originalmente impulsados por máquinas de vapor', photo: '4' },

  ];

  loadedImagesCount: number = 0;
  totalImagesCount: number = this.publicaciones.length; // TODO En el futuro una pub va a poder tener mas de una foto

  @Output() imagesLoaded = new EventEmitter<void>();

  onImageLoad() {
    this.loadedImagesCount++;
    if (this.loadedImagesCount === this.totalImagesCount) {
      this.imagesLoaded.emit(); // Emitimos el evento cuando todas las imágenes se han cargado
    }
  }

  onImageError() {
    // También contamos la imagen si falla
    this.loadedImagesCount++;
    if (this.loadedImagesCount === this.totalImagesCount) {
      this.imagesLoaded.emit();
    }
  }

  trackByPubId(index: number, publicacion: any): number {
    return publicacion.pubId;
  }

  expandedPubId: number | null = null; // Cambiamos a null para inicializar sin expansión

  expandDiv(pubId: number, event: MouseEvent) {
    event.stopPropagation();
    this.expandedPubId = this.expandedPubId === pubId ? null : pubId;
  }


  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const isCardClicked = targetElement.closest('.card');

    if (!isCardClicked) {
      this.expandedPubId = null; // Coloca todas las tarjetas en su tamaño original
    }
  }
}
