import { Component, EventEmitter, HostListener, Inject, OnInit, Output } from '@angular/core';
import { NgIf, NgFor, NgClass, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { ServerService } from '../../services/api/server.service';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, HttpClientModule,CommonModule],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.scss',
  providers: [ServerService],
})
export class PublicationsComponent implements OnInit {
  publications: any[] = [];

  constructor(@Inject(ServerService) private serverService: ServerService) {}
  
  ngOnDestroy() {
    this.removeClonedCard();
  }

  ngOnInit(): void {
    this.serverService.getPublications().subscribe(
      (data) => {
        this.publications = data;
        console.log(this.publications);
      },
      (error) => {
        console.error('Error al obtener publicaciones', error);
      }
    );
  }

  expandedPubId: number | null = null;
  clonedCard: HTMLElement | null = null;

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const isCardClicked = targetElement.closest('.card');
    const isExpandedCardClicked = targetElement.closest('.card-clone');

    if (!isCardClicked && !isExpandedCardClicked && this.clonedCard) {
      this.removeClonedCard();
    }
  }

  expandDiv(pubId: number, event: MouseEvent) {
    event.stopPropagation();

    if (this.clonedCard) {
      this.removeClonedCard();
    }

    const targetElement = event.currentTarget as HTMLElement;
    this.createClonedCard(targetElement, pubId);
  }

  createClonedCard(originalCard: HTMLElement, pubId: number) {
    const clonedCard = originalCard.cloneNode(true) as HTMLElement;
    clonedCard.classList.add('card-clone'); //Esto es para el card se expanda

    clonedCard.style.position = 'fixed';
    clonedCard.style.left = '50%';
    clonedCard.style.top = '50%';
    clonedCard.style.transform = 'translate(-50%, -50%)';
    clonedCard.style.zIndex = '1000';
    clonedCard.style.width = 'fit-content';
    clonedCard.style.maxWidth = '80vw';
    clonedCard.style.height = 'fit-content';
    clonedCard.style.minHeight = '40vh';
    clonedCard.style.maxHeight = '90vh';
    clonedCard.style.overflowY = 'auto';
    clonedCard.style.boxShadow = '0px 0px 15px rgba(0, 0, 0, 0.5)';

    const truncatedText = clonedCard.querySelector('.truncateText') as HTMLElement;
    if (truncatedText) {
      truncatedText.style.display = '-webkit-box';
      truncatedText.style.webkitLineClamp = 'unset';
      truncatedText.style.overflow = 'visible';
      truncatedText.style.textOverflow = 'unset';
      truncatedText.style.maxHeight = 'none';
    }

    document.body.appendChild(clonedCard);

    this.clonedCard = clonedCard;
  }

  removeClonedCard() {
    if (this.clonedCard) {
      document.body.removeChild(this.clonedCard);
      this.clonedCard = null;
    }
  }

  loadedImagesCount: number = 0;
  totalImagesCount: number = this.publications.length;

  @Output() imagesLoaded = new EventEmitter<void>();

  onImageLoad() {
    
    this.loadedImagesCount++;
    if (this.loadedImagesCount === this.totalImagesCount) {
      this.imagesLoaded.emit();
    }
  }

  onImageError() {
    this.loadedImagesCount++;
    
    if (this.loadedImagesCount === this.totalImagesCount) {
      this.imagesLoaded.emit();
    }
  }

  trackByPubId(index: number, publicacion: any): number {
    return publicacion.pubId;
  }

  getImageUrl(imgId: string): string {
    return `../fotosGuardadas/${imgId}?t=${new Date().getTime()}`;
  }

  lastClickedPubId: HTMLElement | null = null;
  firsTime = true;
}