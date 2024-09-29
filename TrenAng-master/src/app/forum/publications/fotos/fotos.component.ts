import { Component } from '@angular/core';

@Component({
  selector: 'app-fotos',
  standalone: true,
  imports: [],
  templateUrl: './fotos.component.html',
  styleUrl: './fotos.component.scss'
})
export class FotosComponent {

  public peliculas = [ 
    {
        fechaPublicacion: '2023-01-01',
        titulo: 'Película 1'
    },
    {
        fechaPublicacion: '2023-02-15',
        titulo: 'Película 2'
    },
    {
        fechaPublicacion: '2023-03-30',
        titulo: 'Película 3'
    },
    {
        fechaPublicacion: '2023-04-20',
        titulo: 'Película 4'
    },
    {
        fechaPublicacion: '2023-05-10',
        titulo: 'Película 5'
    }
  ];
}
