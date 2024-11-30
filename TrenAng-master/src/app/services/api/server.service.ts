import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoTren } from '../../clases/tipoTren/tipo-tren';
import { Usuario } from '../../clases/usuario/usuario';
import { Foro } from '../../clases/foro/foro';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private apiUrl = 'http://localhost:3000/api/publications'; 
  constructor(private http: HttpClient) { }

  // Obtener todas las publicaciones (GET)
  getPublications(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl);
  }

  // Obtener una publicación por ID (GET)
  getPublicationById(pubId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${pubId}`);
  }

  // Crear una nueva publicación (POST)
  createPublication(publication: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.apiUrl, publication, { headers });
  }

  // Actualizar una publicación (PUT)
  updatePublication(pubId: number, publication: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar/${pubId}`, publication);
  }

  // Eliminar una publicación (DELETE)
  deletePublication(pubId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${pubId}`);
  }

  // Obtener los tipos de tren (GET)
  getTrenTypes(): Observable<TipoTren[]> {
    return this.http.get<TipoTren[]>('http://localhost:3000/api/trains/types');
  }
  postIniciarSesion(datosUsuario: { email: string, password: string }): Observable<any> {
    return this.http.post('http://localhost:3000/api/users/login', datosUsuario);
  }
  
  postCrearCuenta(datosUsuario: Usuario): Observable<any> {
    return this.http.post('http://localhost:3000/api/users/create', datosUsuario);
  }
  
  getConversaiones(): Observable<Foro[]> {
    return this.http.get<Foro[]>('http://localhost:3000/api/foroConversaciones');
  }

  getRespuestas(PId :number): Observable<Foro[]>{
    return this.http.get<Foro[]>(`http://localhost:3000/api/foroConversaciones/${PId}`);
  }

  postComentario(foro: Foro): Observable<any> {
    return this.http.post('http://localhost:3000/api/foroConversaciones/comentar', foro);
  }

  postNuevoTema(foro: Foro): Observable<any> {
    return this.http.post('http://localhost:3000/api/foroConversaciones/nuevoTema', foro);
  }


  uploadFormData(formData: FormData): Observable<any> {
    const url = 'http://localhost:3000/upload'; 
    return this.http.post(url, formData);
  }

}