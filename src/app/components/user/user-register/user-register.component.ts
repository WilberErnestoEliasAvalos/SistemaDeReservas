import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../../../models/material-imports';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
    selector: 'app-user-register',
    imports: [materialModules, CommonModule, ReactiveFormsModule],
    templateUrl: './user-register.component.html',
    styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user: User = {
        usuario_id: 0, // Este campo será ignorado por la base de datos si es autoincremental
        nombre: this.registerForm.value.nombre,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        rol_id: 2 // Asignar un rol por defecto o manejarlo según tu lógica
      };
      console.log("Datos enviados:", user);
      this.userService.createUser(user).subscribe(() => {
        this.snackBar.open('Usuario registrado exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/login']); // Redirigir al componente de inicio de sesión
      }, error => {
        console.error('Error al registrar el usuario', error);
        this.snackBar.open('Error al registrar el usuario', 'Cerrar', {
          duration: 3000,
        });
      });
    }
  }
}