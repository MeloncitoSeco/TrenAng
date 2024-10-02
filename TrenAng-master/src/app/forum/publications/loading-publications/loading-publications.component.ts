import { Component } from '@angular/core';
import { defer } from 'rxjs';
import { PublicationsComponent } from '../../publications/publications.component';

@Component({
  selector: 'app-loading-publications',
  standalone: true,
  imports: [PublicationsComponent],
  templateUrl: './loading-publications.component.html',
  styleUrl: './loading-publications.component.scss'
})
export class LoadingPublicationsComponent {

}
