import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private isOpenSubject = new BehaviorSubject<boolean>(false); // Estado inicial
  isOpen$ = this.isOpenSubject.asObservable();

  toggle() {
    this.isOpenSubject.next(!this.isOpenSubject.value); // Cambia el estado
    
  }

  open() {
    this.isOpenSubject.next(true); // Abre el sidenav
  }

  close() {
    this.isOpenSubject.next(false); // Cierra el sidenav
  }
}