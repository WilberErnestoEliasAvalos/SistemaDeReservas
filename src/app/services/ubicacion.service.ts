import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ubicacion } from '../models/ubications';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private apiUrl = 'https://flowery-caterwauling-echium.glitch.me/ubicaciones';

  constructor(private http: HttpClient) {}

  getUbicaciones(): Observable<Ubicacion[]> {
    return this.http.get<Ubicacion[]>(this.apiUrl);
  }
}