import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { materialModules } from '../../../models/material-imports';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../models/room';
import { RouterModule } from '@angular/router';
import { Ubicacion } from '../../../models/ubications';
import { UbicacionService } from '../../../services/ubicacion.service';

@Component({
  standalone: true,
    selector: 'app-room-list',
    imports: [CommonModule, ...materialModules, RouterModule],
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  displayedColumns: string[] = ['index', 'nombre', 'capacidad', 'ubicacion', 'precio', 'disponible', 'acciones'];
  dataSource: MatTableDataSource<Room>;
  ubicaciones: Ubicacion[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private roomService: RoomService, private ubicacionService: UbicacionService) {
    this.dataSource = new MatTableDataSource<Room>();
  }

  ngOnInit(): void {
    this.getRooms();
    this.loadUbicaciones();
  }

  getRooms(): void {
    this.roomService.getRooms().subscribe((data: Room[]) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
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
  getIndex(index: number): number {
    return index + 1 + (this.paginator.pageIndex * this.paginator.pageSize);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteRoom(id: number): void {
    this.roomService.deleteRoom(id).subscribe(() => {
      this.getRooms(); // Refresh the list after deletion
    });
  }
}