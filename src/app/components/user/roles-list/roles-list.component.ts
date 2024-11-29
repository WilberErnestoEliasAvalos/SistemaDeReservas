import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {
  roles: any[] = [];
  usuarios: any[] = [];
  assignRoleForm: FormGroup;
  isLoading = true;

  constructor(private userService: UserService, private fb: FormBuilder) {
    // Inicializa el formulario
    this.assignRoleForm = this.fb.group({
      usuarioId: ['', Validators.required],
      rolId: [2, Validators.required] // Predetermina el rol de Administrador
    });
  }

  ngOnInit() {
    this.loadRoles();
    this.loadUsuarios();
  }

  // Cargar solo el rol de Administrador
  loadRoles() {
    this.roles = [{ rol_id: 1, nombre: 'Administrador' }];
    this.isLoading = false;
  }

  // Cargar usuarios con el rol de Cliente
  loadUsuarios() {
    this.userService.getUsers2().subscribe(
      (usuarios) => {
        // Filtrar usuarios con rol_id = 1 (Cliente)
        this.usuarios = usuarios.filter(usuario => usuario.rol_id === 2);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
        this.usuarios = [];
      }
    );
  }

  // Asignar el rol de Administrador a un usuario seleccionado
  assignRole() {
    if (this.assignRoleForm.invalid) {
      return;
    }

    const { usuarioId, rolId } = this.assignRoleForm.value;

    this.userService.assignRole(usuarioId, rolId).subscribe(
      (response) => {
        alert(response.message || 'Rol asignado exitosamente');
        this.assignRoleForm.reset();
        this.loadUsuarios(); // Refrescar la lista de usuarios
      },
      (error) => {
        console.error('Error al asignar el rol:', error);
        alert('Error al asignar el rol');
      }
    );
  }

  // Obtener el nombre del rol (aunque aquí siempre será Cliente)
  getRoleName(rolId: number): string {
    if (rolId === 1) return 'Administrador';
    if (rolId === 2) return 'Cliente';
    return 'Desconocido';
  }
}
