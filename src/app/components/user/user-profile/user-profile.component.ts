import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'; // Asegúrate de tener este servicio
import { Contact, User } from '../../../models/user';
import { materialModules } from '../../../models/material-imports';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../interceptors/auth.service';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from '../../../services/contact.service';
import { EditContactComponent } from '../edit-contact/edit-contact.component';

@Component({
  standalone: true,
    selector: 'app-user-profile',
    imports: [materialModules, CommonModule, RouterLink],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(
    private userService: UserService,
    private contactService: ContactService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.getUserId().subscribe((userId: number | null) => {
      if (userId !== null) {
        this.loadUserProfile(userId);
      } else {
        console.error('No se pudo obtener el ID del usuario logueado');
      }
    });
  }

  loadUserProfile(id: number): void {
    this.userService.getUserProfile(id).subscribe(
      (data: User) => {
        this.user = data;
        this.loadUserContact(data.usuario_id);
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario', error);
      }
    );
  }

  loadUserContact(userId: number): void {
    this.contactService.getContactById(userId).subscribe(
      (contact: Contact) => {
        if (this.user) {
          this.user.contacto = contact;
        }
      },
      (error) => {
        console.error('Error al obtener la información de contacto', error);
      }
    );
  }

  editProfile(): void {
    if (this.user) {
      const dialogRef = this.dialog.open(EditProfileComponent, {
        width: '400px',
        data: { user: this.user }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadUserProfile(this.user!.usuario_id);
        }
      });
    }
  }

  changePassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Contraseña cambiada con éxito');
      }
    });
  }

  editContact(): void {
    if (this.user) {
      const dialogRef = this.dialog.open(EditContactComponent, {
        width: '400px',
        data: { contact: this.user.contacto, userId: this.user.usuario_id }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadUserContact(this.user!.usuario_id);
        }
      });
    }
  }
}