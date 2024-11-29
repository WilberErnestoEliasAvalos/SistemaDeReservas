import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { materialModules } from '../../../models/material-imports';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-usuarios-list',
  imports: [CommonModule, ...materialModules, ReactiveFormsModule],
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {
  usuarios: User[] = [];

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.usuarios = data;
        console.log('Usuarios cargados:', this.usuarios);
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }

  openEditDialog(usuario: User): void {
    const dialogRef = this.dialog.open(EditUserDialog, {
      width: '400px',
      data: { ...usuario }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsuarios(); // Recargar la lista de usuarios después de editar
      }
    });
  }

  deleteUser(usuarioId: number): void {
    this.userService.deleteUser(usuarioId).subscribe(
      () => {
        console.log('Usuario eliminado');
        this.loadUsuarios(); // Recargar la lista de usuarios después de eliminar
      },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }
}

@Component({
  selector: 'edit-user-dialog',
  standalone: true,
  imports: [...materialModules, ReactiveFormsModule],
  template: `
    <h2 mat-dialog-title>Editar Usuario</h2>
    <mat-dialog-content>
      <form [formGroup]="editForm">
        <mat-form-field appearance="fill">
          <mat-label>Nombre</mat-label>
          <input matInput formControlName="nombre">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email">
        </mat-form-field>
        <mat-checkbox formControlName="isAdmin">Administrador</mat-checkbox>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-button (click)="onSaveClick()" [disabled]="!editForm.valid">Guardar</button>
    </mat-dialog-actions>
  `
})
export class EditUserDialog {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.editForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      isAdmin: [data.rol_id === 1]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editForm.valid) {
      const updatedUser: User = {
        ...this.data,
        nombre: this.editForm.value.nombre,
        email: this.editForm.value.email,
        rol_id: this.editForm.value.isAdmin ? 1 : 2
      };

      this.userService.updateUser(updatedUser.usuario_id, updatedUser).subscribe(
        () => {
          console.log('Usuario actualizado');
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error al actualizar el usuario:', error);
        }
      );
    }
  }
}