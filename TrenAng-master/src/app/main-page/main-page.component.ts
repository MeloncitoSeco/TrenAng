import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MatCardModule, 
    MatButtonModule,
  MatGridListModule,
  MatListModule,
  CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  trenesNuevos = [
    { modelo: 'Civia, Renfe 465', texto: 'Alta velocidad y eficiencia.' },
    { modelo: 'Renfe 446', texto: 'Ideal para la ciudad.' },
    { modelo: 'Tren de Carga', texto: 'Perfecto para transporte industrial.' },
    { modelo: 'AVE S-103', texto: 'Diseñado para largas distancias a alta velocidad.' },
    { modelo: 'Talgo 350', texto: 'Conocido por su confort y diseño aerodinámico.' },
    { modelo: 'Metro de Madrid Serie 9000', texto: 'Tecnología moderna para transporte urbano.' },
    { modelo: 'Freightliner Class 66', texto: 'Potente locomotora de carga con alto rendimiento.' },
    { modelo: 'Eurostar e320', texto: 'Tren transfronterizo para viajar por Europa.' },
    { modelo: 'ICE 4', texto: 'Tren alemán de alta velocidad y capacidad mejorada.' },
    { modelo: 'Alstom Coradia Lint', texto: 'Tren diésel ligero utilizado en rutas regionales.' },
    { modelo: 'Bombardier Zefiro', texto: 'Uno de los trenes más rápidos del mundo.' },
    { modelo: 'Siemens Desiro', texto: 'Eficiente y confiable para transporte regional y urbano.' },
    { modelo: 'Shinkansen N700S', texto: 'La última generación del famoso tren bala japonés.' },
    { modelo: 'Stadler FLIRT', texto: 'Tren versátil para servicios regionales y de cercanías.' },
    { modelo: 'TGV Duplex', texto: 'Tren francés de alta velocidad con capacidad para 500 pasajeros.' }
];

}
