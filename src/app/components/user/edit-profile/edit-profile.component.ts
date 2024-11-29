import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { materialModules } from '../../../models/material-imports';

@Component({
  selector: 'app-edit-profile',
  imports: [...materialModules, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  user: User;

  dialogRef = inject(MatDialogRef<EditProfileComponent>);
  data = inject(MAT_DIALOG_DATA);
  fb = inject(FormBuilder);
  userService = inject(UserService);

  constructor() {
    this.user = this.data.user;
    this.editProfileForm = this.fb.group({
      nombre: [this.user.nombre, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      this.userService.updateUserProfile(this.user.usuario_id, this.editProfileForm.value).subscribe(
        (response) => {
          console.log('Perfil actualizado:', response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error al actualizar el perfil:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}