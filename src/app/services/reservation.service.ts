import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';
import moment from 'moment';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = `${environment.apiUrl}/reservas`;

  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`);
  }

  getReservationsByUser(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}?usuario_id=${userId}`);
  }

  getActiveReservationsByUser(userId: number): Observable<Reservation[]> {
    // Asegúrate de que el parámetro 'usuario_id' es el que tu API espera
    return this.http.get<Reservation[]>(`${this.apiUrl}?usuario_id=${userId}&estado_reserva_id=1`);
  }

  getArchivedReservationsByUser(userId: number): Observable<Reservation[]> {
    // Asegúrate de que el parámetro 'usuario_id' es el que tu API espera
    return this.http.get<Reservation[]>(`${this.apiUrl}?usuario_id=${userId}&estado_reserva_id=2`);
  }

  getReservationsByDateAndRoom(salaId: number, fechaReserva: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`https://flowery-caterwauling-echium.glitch.me/reservas_por_sala_y_fecha?sala_id=${salaId}&fecha_reserva=${fechaReserva}`);
  }

  createReservation(reservation: Reservation): Observable<any> {
    return this.http.post<any>(this.apiUrl, reservation);
  }

  updateReservation(id: number, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/${id}`, reservation);
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  scheduleReservationStatusUpdate(reservation: Reservation): void {
    const endTime = moment.tz(`${reservation.fecha_reserva} ${reservation.hora_fin}`, 'YYYY-MM-DD HH:mm:ss', 'America/El_Salvador');
    const now = moment.tz('America/El_Salvador');
    const delay = endTime.diff(now);

    if (delay > 0) {
      setTimeout(() => {
        reservation.estado_reserva_id = 2; // Estado 2 = Terminada
        this.updateReservation(reservation.reserva_id, reservation).subscribe(() => {
          console.log('Estado de la reserva actualizado a Terminada:', reservation);
        });
      }, delay);
    }
  }

  getReservationsByDate(fecha_reserva: string): Observable<Reservation[]> {
    const url = `${this.apiUrl}?fecha_reserva=${fecha_reserva}`;
    return this.http.get<Reservation[]>(url);
  }
}