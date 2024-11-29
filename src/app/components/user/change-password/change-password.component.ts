import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { materialModules } from '../../../models/material-imports';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  imports: [...materialModules, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  dialogRef = inject(MatDialogRef<ChangePasswordComponent>);
  fb = inject(FormBuilder);
  userService = inject(UserService);
  snackBar = inject(MatSnackBar);

  constructor() {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const { currentPassword, newPassword, confirmPassword } = this.changePasswordForm.value;
      if (newPassword !== confirmPassword) {
        this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        return;
      }
      this.userService.changePassword(currentPassword, newPassword).subscribe(
        (response) => {
          this.snackBar.open('Contraseña actualizada con éxito', 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          this.dialogRef.close(response);
        },
        (error) => {
          if (error.status === 401) {
            this.snackBar.open('Contraseña actual incorrecta', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
          } else {
            this.snackBar.open('Error al cambiar la contraseña', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
          }
          console.error('Error al cambiar la contraseña:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}