import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../models/room';
import { materialModules } from '../../../models/material-imports';
import { register } from 'swiper/element/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ReservationCreateComponent } from '../../reservation/reservation-create/reservation-create.component';
import { AuthService } from '../../../interceptors/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UbicacionService } from '../../../services/ubicacion.service';
import { Ubicacion } from '../../../models/ubications';

register();

@Component({
  standalone: true,
    selector: 'app-home',
    templateUrl: './home.component.html',
    imports: [CommonModule, MatDialogModule, ...materialModules],
    styleUrls: ['./home.component.css'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit, OnDestroy {
  rooms: Room[] = [];
  ubicaciones: Ubicacion[] = [];
  loop: boolean = true;
  breakpoints = {
    0: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 10
    }
  };
  displayedColumns: string[] = ['nombre', 'precio', 'actividad', 'ubicacion'];
  private authSubscription: Subscription = new Subscription();

  constructor(
    private roomService: RoomService,
    private ubicacionService: UbicacionService,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roomService.getRooms().subscribe({
      next: (rooms: Room[]) => {
        this.rooms = rooms;
        this.loop = this.rooms.length >= 2;
      },
      error: (err) => {
        console.error('Error fetching rooms:', err);
      }
    });

    this.ubicacionService.getUbicaciones().subscribe({
      next: (ubicaciones: Ubicacion[]) => {
        this.ubicaciones = ubicaciones;
      },
      error: (err) => {
        console.error('Error fetching ubicaciones:', err);
      }
    });
  }

  getUbicacionDescripcion(ubicacionId: number): string {
    const ubicacion = this.ubicaciones.find(u => u.ubicacion_id === ubicacionId);
    return ubicacion ? ubicacion.descripcion : 'Desconocida';
  }

  openReservationDialog(room: Room): void {
    this.dialog.open(ReservationCreateComponent, {
      width: 'auto',
      data: { room }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}