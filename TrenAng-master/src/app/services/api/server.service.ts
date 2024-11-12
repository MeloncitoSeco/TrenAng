import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoTren } from '../../clases/tipoTren/tipo-tren';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private apiUrl = 'http://localhost:3000/api/publications'; 

  constructor(private http: HttpClient) { }

  // Obtener todas las publicaciones
  getPublications(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl);
  }

  // Obtener una publicación por ID
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
  getTrenTypes(): Observable<TipoTren[]> {
    return this.http.get<TipoTren[]>('http://localhost:3000/api/trains/types');
  }
}