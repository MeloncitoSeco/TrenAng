import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  toggle() {
    if(!this.isOpenSubject.value){
      window.scrollTo({ top: 0, behavior: 'smooth' });

    }
    this.isOpenSubject.next(!this.isOpenSubject.value);
    
    
  }

  open() {
    this.isOpenSubject.next(true);
    
  }

  close() {
    this.isOpenSubject.next(false);
  }
}