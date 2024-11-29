import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-administradores-list',
  templateUrl: './administradores-list.component.html',
  styleUrls: ['./administradores-list.component.css'],
  imports: [CommonModule, MatTableModule, MatCardModule], // Asegúrate de incluir MatTableModule
})
export class AdministradoresListComponent implements OnInit {
  administradores: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadAdministradores();
  }

  loadAdministradores(): void {
    this.userService.getAdmins().subscribe(
      (data: User[]) => {
        this.administradores = data; // Carga la lista de administradores
        console.log('Administradores cargados:', this.administradores);
      },
      (error) => {
        console.error('Error al cargar los administradores:', error);
      }
    );
  }
}
