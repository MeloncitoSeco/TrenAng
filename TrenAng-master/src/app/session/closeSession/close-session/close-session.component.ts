import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-close-session',
  standalone: true,
  imports: [],
  templateUrl: './close-session.component.html',
  styleUrl: './close-session.component.scss'
})
export class CloseSessionComponent implements OnInit{

    constructor(private router : Router){

    }

    ngOnInit(): void {
      sessionStorage.clear()
      this.router.navigate(['/home']);
    }

}
