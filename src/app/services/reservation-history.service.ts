import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationHistory } from '../models/reservation-history';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationHistoryService {
  private apiUrl = `${environment.apiUrl}/reservation-histories`;

  constructor(private http: HttpClient) {}

  getReservationHistories(): Observable<ReservationHistory[]> {
    return this.http.get<ReservationHistory[]>(this.apiUrl);
  }

  getReservationHistoryById(id: number): Observable<ReservationHistory> {
    return this.http.get<ReservationHistory>(`${this.apiUrl}/${id}`);
  }

  createReservationHistory(history: ReservationHistory): Observable<ReservationHistory> {
    return this.http.post<ReservationHistory>(this.apiUrl, history);
  }

  updateReservationHistory(id: number, history: ReservationHistory): Observable<ReservationHistory> {
    return this.http.put<ReservationHistory>(`${this.apiUrl}/${id}`, history);
  }

  deleteReservationHistory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}