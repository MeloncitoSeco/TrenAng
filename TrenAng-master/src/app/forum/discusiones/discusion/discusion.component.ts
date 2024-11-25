import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-discusion',
  standalone: true,
  imports: [FormsModule,CommonModule], 
  templateUrl: './discusion.component.html',
  styleUrl: './discusion.component.scss'
})
export class DiscusionComponent {
   
    threads: { content: string; responses: string[]; newResponse?: string }[] = [];
    newThreadContent: string = '';
  
    crearNuevaConversacion() {
      if (this.newThreadContent.trim()) {
        this.threads.push({ content: this.newThreadContent.trim(), responses: [] });
        this.newThreadContent = ''; // Limpiar el campo
      }
    }
  
    responderAConversacion(index: number) {
      const thread = this.threads[index];
      if (thread.newResponse?.trim()) {
        thread.responses.push(thread.newResponse.trim());
        thread.newResponse = ''; // Limpiar el campo
      }
    }
  }
