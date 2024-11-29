import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { ReservationService } from '../../../services/reservation.service';
import { materialModules } from '../../../models/material-imports';
import { CommonModule } from '@angular/common';
import { Room } from '../../../models/room';
import { Reservation } from '../../../models/reservation';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { Ubicacion } from '../../../models/ubications';
import { UbicacionService } from '../../../services/ubicacion.service';
import { ReservationCreateComponent } from '../../reservation/reservation-create/reservation-create.component';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'app-room-availability',
  templateUrl: './room-availability.component.html',
  styleUrls: ['./room-availability.component.css'],
  imports: [...materialModules, CommonModule, FormsModule, MatNativeDateModule]
})
export class RoomAvailabilityComponent implements OnInit {
  rooms: Room[] = [];
  reservations: Reservation[] = [];
  hours: string[] = [];
  displayedColumns: string[] = ['sala'];
  ubicaciones: Ubicacion[] = [];
  selectedDate: Date = new Date(); // Fecha seleccionada, por defecto hoy
  minDate: Date = new Date(); // Fecha mínima para el datepicker (hoy)

  constructor(
    private roomService: RoomService,
    private reservationService: ReservationService,
    private dialog: MatDialog,
    private ubicacionService: UbicacionService
  ) {}

  ngOnInit(): void {
    this.initializeHours();
    this.getRooms();
    this.loadUbicaciones();
    this.getReservations(); // Obtener reservas para la fecha actual
  }

  initializeHours(): void {
    const startHour = 8;
    const endHour = 22;
    for (let hour = startHour; hour < endHour; hour++) {
      const hourRange = `${hour}:00 - ${hour + 1}:00`;
      this.hours.push(hourRange);
      this.displayedColumns.push(hourRange);
    }
  }

  getRooms(): void {
    this.roomService.getRooms().subscribe((data: Room[]) => {
      this.rooms = data;
    });
  }

  getReservations(): void {
    const fecha_reserva = moment(this.selectedDate).format('YYYY-MM-DD');
    this.reservationService.getReservationsByDate(fecha_reserva).subscribe((data: Reservation[]) => {
      this.reservations = data;
    });
  }

  loadUbicaciones(): void {
    this.ubicacionService.getUbicaciones().subscribe((data: Ubicacion[]) => {
      this.ubicaciones = data;
    });
  }

  onDateChange(event: any): void {
    this.selectedDate = event.value;
    this.getReservations(); // Actualizar las reservas según la nueva fecha
  }

  getUbicacionDescripcion(ubicacion_id: number): string {
    const ubicacion = this.ubicaciones.find(u => u.ubicacion_id === ubicacion_id);
    return ubicacion ? ubicacion.descripcion : 'Desconocida';
  }

  getAvailabilityClass(room: Room, hour: string): string {
    const [startHourStr, endHourStr] = hour.split(' - ');
    const startHour = moment(startHourStr, 'HH:mm');
    const endHour = moment(endHourStr, 'HH:mm');
    const roomReservations = this.reservations.filter(reservation => reservation.sala_id === room.sala_id);

    for (const reservation of roomReservations) {
      const reservationStart = moment(reservation.hora_inicio, 'HH:mm:ss');
      const reservationEnd = moment(reservation.hora_fin, 'HH:mm:ss');

      if (reservationStart.isBefore(endHour) && reservationEnd.isAfter(startHour)) {
        return 'occupied';
      }
    }

    return 'available';
  }

  openReservationDialog(room: Room): void {
    this.dialog.open(ReservationCreateComponent, {
      width: 'auto',
      data: { room }
    });
  }
}