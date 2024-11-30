import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getReservasPorSala(fechaInicio: string, fechaFin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reporte_reservas_por_sala`, {
      params: {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
      }
    });
  }

  getReservasPorUsuario(fechaInicio: string, fechaFin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reporte_reservas_por_usuario`, {
      params: {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
      }
    });
  }

  getEstadosReservas(fechaInicio: string, fechaFin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reporte_estados_reservas`, {
      params: {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
      }
    });
  }

  getIngresosPorSala(fechaInicio: string, fechaFin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reporte_ingresos_por_sala`, {
      params: {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
      }
    });
  }

  getUsoSalasPorUbicacion(fechaInicio: string, fechaFin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reporte_uso_salas_por_ubicacion`, {
      params: {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
      }
    });
  }

  getContactosUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reporte_contactos_usuarios`);
  }
}