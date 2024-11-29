import { Component, Inject, ViewChild } from '@angular/core';
import { materialModules } from '../../../models/material-imports';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ubicacion } from '../../../models/ubications';
import { UbicacionService } from '../../../services/ubicacion.service';
@Component({
  standalone: true,
    selector: 'app-room-detail-dialog',
    imports: [CommonModule, ...materialModules, RouterModule],
    templateUrl: './room-detail-dialog.component.html',
    styleUrl: './room-detail-dialog.component.css'
})
export class RoomDetailDialogComponent {
  ubicaciones: Ubicacion[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { room: any }, private ubicacionService: UbicacionService) {
    this.loadUbicaciones();
  }

  loadUbicaciones(): void {
    this.ubicacionService.getUbicaciones().subscribe((data: Ubicacion[]) => {
      this.ubicaciones = data;
    });
  }

  getUbicacionDescripcion(ubicacion_id: number): string {
    const ubicacion = this.ubicaciones.find(u => u.ubicacion_id === ubicacion_id);
    return ubicacion ? ubicacion.descripcion : 'Desconocida';
  }
}
