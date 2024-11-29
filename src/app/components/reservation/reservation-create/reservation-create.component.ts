import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../../models/reservation';
import { materialModules } from '../../../models/material-imports';
import moment from 'moment-timezone';
import { ReservationService } from '../../../services/reservation.service';
import { NotificationService } from '../../../services/notification.service';
import { AuthService } from '../../../interceptors/auth.service';
import { Router } from '@angular/router';
import { switchMap, EMPTY } from 'rxjs';

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatNativeDateModule, materialModules],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationCreateComponent implements OnInit {
  reservationForm: FormGroup;
  minDate: Date;
  minTime: string;
  availableTimes: string[] = [];
  availableEndTimes: string[] = [];
  occupiedTimes: { start: string, end: string }[] = [];

  dialogRef = inject(MatDialogRef<ReservationCreateComponent>);
  data = inject(MAT_DIALOG_DATA);
  fb = inject(FormBuilder);
  reservationService = inject(ReservationService);
  notificationService = inject(NotificationService);
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    this.minDate = new Date(); // Establecer la fecha mínima en la fecha actual
    this.minTime = this.getNextFullHour(); // Establecer la hora mínima en la siguiente hora completa
    this.reservationForm = this.fb.group({
      fecha_reserva: [this.minDate, Validators.required], // Preseleccionar la fecha del día actual
      hora_inicio: ['', Validators.required],
      hora_fin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.updateAvailableTimes();
  }

  getNextFullHour(): string {
    const now = moment().tz('America/El_Salvador');
    let hours = now.hours();
    const minutes = now.minutes();

    if (minutes > 0) {
      hours += 1; // Avanzar a la siguiente hora completa si hay minutos en la hora actual
    }

    return `${hours.toString().padStart(2, '0')}:00`;
  }

  updateAvailableTimes(): void {
    const now = moment().tz('America/El_Salvador');
    const selectedDateValue = this.reservationForm.get('fecha_reserva')?.value;
    if (!selectedDateValue) {
      console.error('Fecha de reserva inválida:', selectedDateValue);
      return;
    }
    const selectedDate = moment(selectedDateValue).tz('America/El_Salvador');
    if (!selectedDate.isValid()) {
      console.error('Fecha de reserva inválida:', selectedDate);
      return;
    }
    const startHour = selectedDate.isSame(now, 'day') ? Math.max(8, now.hours() + 1) : 8;
    this.availableTimes = [];

    for (let hour = startHour; hour <= 22; hour++) {
      this.availableTimes.push(moment({ hour }).format('hh:mm A'));
    }

    this.loadOccupiedTimes();
  }

  loadOccupiedTimes(): void {
    const fecha_reserva = moment(this.reservationForm.get('fecha_reserva')?.value).format('YYYY-MM-DD');
    if (fecha_reserva === 'Invalid date') {
      console.error('Fecha de reserva inválida:', fecha_reserva);
      return;
    }
    this.reservationService.getReservationsByDateAndRoom(this.data.room.sala_id, fecha_reserva).subscribe(reservations => {
      this.occupiedTimes = [];
      reservations.forEach(reservation => {
        const startHour = moment(reservation.hora_inicio, 'HH:mm:ss').format('hh:mm A');
        const endHour = moment(reservation.hora_fin, 'HH:mm:ss').format('hh:mm A');
        this.occupiedTimes.push({ start: startHour, end: endHour });
      });
    });
  }

  updateAvailableEndTimes(): void {
    const startTime = this.reservationForm.get('hora_inicio')?.value;
    const [startHour, startMinute] = moment(startTime, 'hh:mm A').format('HH:mm').split(':').map(Number);
    this.availableEndTimes = [];

    for (let hour = startHour + 1; hour <= 22; hour++) {
      const time = moment({ hour }).format('hh:mm A');
      if (!this.occupiedTimes.some(occupied => moment(time, 'hh:mm A').isBetween(moment(occupied.start, 'hh:mm A'), moment(occupied.end, 'hh:mm A'), null, '[)'))) {
        this.availableEndTimes.push(time);
      }
    }
  }

  isTimeOccupied(time: string): boolean {
    return this.occupiedTimes.some(occupied => moment(time, 'hh:mm A').isBetween(moment(occupied.start, 'hh:mm A'), moment(occupied.end, 'hh:mm A'), null, '[)'));
  }

  onNoClick(): void {
    this.dialogRef.close(); // Cerrar el modal sin realizar ninguna acción adicional
  }

  onSubmit(): void {
    this.authService.isAuthenticated().pipe(
      switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          this.dialogRef.close();
          this.router.navigate(['/login']);
          return EMPTY;
        }

        if (this.reservationForm.valid) {
          return this.authService.getUserId();
        } else {
          return EMPTY;
        }
      }),
      switchMap(userId => {
        if (userId === null) {
          console.error('No se pudo obtener el ID del usuario logueado');
          return EMPTY;
        }

        const fecha_reserva = moment(this.reservationForm.value.fecha_reserva).format('YYYY-MM-DD');
        const hora_inicio = moment(this.reservationForm.value.hora_inicio, 'hh:mm A').format('HH:mm:ss');
        const hora_fin = moment(this.reservationForm.value.hora_fin, 'hh:mm A').format('HH:mm:ss');

        const reservation: Reservation = {
          reserva_id: 0, // Este valor se generará en el backend
          usuario_id: userId, // Usar el ID del usuario logueado
          sala_id: this.data.room.sala_id,
          fecha_reserva: fecha_reserva,
          hora_inicio: hora_inicio,
          hora_fin: hora_fin,
          estado_reserva_id: 1 // Estado inicial de la reserva
        };

        console.log('Datos de la reserva:', reservation); // Verificar los datos

        return this.reservationService.createReservation(reservation);
      })
    ).subscribe(
      response => {
        console.log('Reserva y historial creados:', response);
        this.notificationService.addNotification({
          message: `Haz reservado la sala "${this.data.room.nombre}" con éxito.`,
          reservationId: response.reservaId,
          read: false
        });
        this.reservationService.scheduleReservationStatusUpdate(response);
        this.dialogRef.close(response);
        this.router.navigate(['/reservations']); // Redirigir a /reservations
      },
      error => {
        console.error('Error al crear la reserva:', error);
      }
    );
  }

  onFechaReservaChange(): void {
    this.updateAvailableTimes();
    this.reservationForm.get('hora_inicio')?.setValue('');
    this.reservationForm.get('hora_fin')?.setValue('');
  }

  onHoraInicioChange(): void {
    this.updateAvailableEndTimes();
    this.reservationForm.get('hora_fin')?.setValue('');
  }
}