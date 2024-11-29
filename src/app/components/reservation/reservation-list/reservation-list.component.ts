import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { Reservation } from '../../../models/reservation';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';
import { materialModules } from '../../../models/material-imports';
import { AuthService } from '../../../interceptors/auth.service';
import { RoomService } from '../../../services/room.service';
import { ReservationStatusService } from '../../../services/reservation-status.service';
import { Room } from '../../../models/room';
import { ReservationStatus } from '../../../models/reservation-status';
import moment from 'moment';

@Component({
    selector: 'app-reservation-list',
    imports: [CommonModule, RouterModule, ...materialModules],
    templateUrl: './reservation-list.component.html',
    styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  activeReservations: Reservation[] = [];
  archivedReservations: Reservation[] = [];
  rooms: Room[] = [];
  reservationStatuses: ReservationStatus[] = [];
  showActive: boolean = true;
  userId: number = 0; // Inicializar la propiedad userId

  constructor(
    private reservationService: ReservationService,
    private roomService: RoomService,
    private reservationStatusService: ReservationStatusService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUserId().subscribe((userId: number | null) => {
      if (userId !== null) {
        this.userId = userId;
        console.log('User ID obtenido:', this.userId); // Agregado para depuración
        this.getActiveReservations();
        this.getArchivedReservations();
        this.loadRooms();
        this.loadReservationStatuses();
      } else {
        console.error('User ID es nulo');
      }
    });
  }

  getActiveReservations(): void {
    this.reservationService.getActiveReservationsByUser(this.userId).subscribe(data => {
      this.activeReservations = data;
      console.log('Reservas Activas del Usuario:', this.activeReservations); // Agregado para depuración
    });
  }
  
  getArchivedReservations(): void {
    this.reservationService.getArchivedReservationsByUser(this.userId).subscribe(data => {
      this.archivedReservations = data;
      console.log('Reservas Archivadas del Usuario:', this.archivedReservations); // Agregado para depuración
    });
  }

  loadRooms(): void {
    this.roomService.getRooms().subscribe(data => {
      this.rooms = data;
    });
  }

  loadReservationStatuses(): void {
    this.reservationStatusService.getReservationStatuses().subscribe(data => {
      this.reservationStatuses = data;
    });
  }

  getRoomName(roomId: number): string {
    const room = this.rooms.find(r => r.sala_id === roomId);
    return room ? room.nombre : 'Desconocida';
  }

  getReservationStatusName(statusId: number): string {
    const status = this.reservationStatuses.find(s => s.estado_reserva_id === statusId);
    return status ? status.estado : 'Desconocido';
  }

  formatDate(date: string): string {
    return moment.utc(date).format('DD/MM/YYYY'); // Asegúrate de usar UTC para evitar problemas de zona horaria
  }

  formatTime(time: string): string {
    return moment(time, 'HH:mm:ss').format('hh:mm A');
  }

  toggleView(): void {
    this.showActive = !this.showActive;
  }
}