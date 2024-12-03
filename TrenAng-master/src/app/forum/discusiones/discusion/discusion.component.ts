import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Foro } from '../../../clases/foro/foro';
import { ServerService } from '../../../services/api/server.service';
import { Router } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-discusion',
  standalone: true,
  imports: [FormsModule, 
    CommonModule,
    MatDividerModule
  ],
  templateUrl: './discusion.component.html',
  styleUrl: './discusion.component.scss'
})
export class DiscusionComponent implements OnInit {
  threads: Foro[] = []; // Lista de hilos principales
  respuestas: Foro[] = []; // Lista de respuestas
  newThreadContent: string = ''; // Contenido del nuevo hilo
  texto: { [key: number]: string } = {}; // Objeto para almacenar respuestas por idComentario
  pId: number | null = null; // ID del hilo actual
  idComentario: number | null = null; // ID del comentario actual
  expandedThreadId: number | null = null; // ID del hilo con respuestas visibles

  constructor(private serverService: ServerService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) { }

  ngOnInit(): void {
    try {
      // Verificar si estamos en el navegador
      if (isPlatformBrowser(this.platformId)) {
        const valor: string | null = sessionStorage.getItem('usuarioNombre');
        

        if (valor) {
          this.cargarConversaciones(); // Cargar las conversaciones al iniciar
          
        } else {
          this.router.navigate(['/login']); // Redirigir al login
        }
      } else {
        this.router.navigate(['/home']);
        console.warn('sessionStorage no está disponible fuera del navegador.');
      }
    } catch (error) {
      const typedError = error as Error; // Forzar a que sea de tipo Error
      console.error('Error en DiscusionComponent:', typedError.message);

      if (typedError.message.includes('NG0500')) {
        this.router.navigate(['/home']);
      }
    }
  }
  // Cargar todas las conversaciones principales (PId = null)
  cargarConversaciones() {
    this.serverService.getConversaiones().subscribe(
      (data: Foro[]) => {
        this.threads = data; // Asignar las conversaciones principales
      },
      (error) => {
        console.error('Error al cargar las conversaciones:', error);
      }
    );
  }

  // Crear una nueva conversación (hilo principal)
  crearNuevaConversacion() {
    if (this.newThreadContent.trim()) {
      const newThread: Foro = {
        idComentario: null,
        Texto: this.newThreadContent.trim(),
        Creador: sessionStorage.getItem('usuarioNombre') || '', // Ajustar según autenticación
        PId: null
      };

      this.serverService.postNuevoTema(newThread).subscribe(
        () => {
          this.cargarConversaciones(); // Refrescar la lista después de agregar
          this.newThreadContent = ''; // Limpiar el campo
        },
        (error) => {
          console.error('Error al crear una nueva conversación:', error);
        }
      );
    }
  }

  // Responder a una conversación existente
  responderAConversacion(thread: Foro) {
    console.log("usuario: " + sessionStorage.getItem('usuarioNombre'));
    const respuestaTexto = this.texto[thread.idComentario || 0]; // Obtener texto de respuesta por idComentario
    if (respuestaTexto?.trim()) {
      const respuesta: Foro = {
        idComentario: null,
        Texto: respuestaTexto.trim(),
        Creador: sessionStorage.getItem('usuarioNombre') || '', // Ajustar según autenticación
        PId: thread.idComentario || null
      };

      this.serverService.postComentario(respuesta).subscribe(
        () => {
          this.cargarRespuestas(thread); // Recargar respuestas después de agregar
          this.texto[thread.idComentario || 0] = ''; // Limpiar campo de respuesta
        },
        (error) => {
          console.error('Error al responder la conversación:', error);
        }
      );
    }
  }

  // Cargar respuestas para un hilo específico
  cargarRespuestas(thread: Foro) {
    // Si el hilo ya está expandido, cerramos las respuestas
    if (this.expandedThreadId === thread.idComentario) {
      this.respuestas = [];
      this.expandedThreadId = null; // Ocultar las respuestas
    } else {
      this.serverService.getRespuestas(thread.idComentario || 0).subscribe(
        (data: Foro[]) => {
          this.respuestas = data; // Agregar respuestas al hilo
          this.expandedThreadId = thread.idComentario; // Marcar el hilo como expandido
        },
        (error) => {
          console.error('Error al cargar respuestas:', error);
        }
      );
    }
  }
}