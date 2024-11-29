import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from '../../../models/user';
import { ContactService } from '../../../services/contact.service';
import { materialModules } from '../../../models/material-imports';

@Component({
  selector: 'app-edit-contact',
  imports: [...materialModules, ReactiveFormsModule],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent implements OnInit {
  editContactForm: FormGroup;
  contact: Contact;

  dialogRef = inject(MatDialogRef<EditContactComponent>);
  data = inject(MAT_DIALOG_DATA);
  fb = inject(FormBuilder);
  contactService = inject(ContactService);

  constructor() {
    this.contact = this.data.contact || { contacto_id: 0, usuario_id: this.data.userId, telefono: '', direccion: '' };
    this.editContactForm = this.fb.group({
      telefono: [this.contact.telefono, Validators.required],
      direccion: [this.contact.direccion, Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.editContactForm.valid) {
      const updatedContact: Contact = {
        ...this.contact,
        telefono: this.editContactForm.value.telefono,
        direccion: this.editContactForm.value.direccion
      };

      if (this.contact.contacto_id) {
        this.contactService.updateContact(this.contact.contacto_id, updatedContact).subscribe(
          () => {
            console.log('Información de contacto actualizada');
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error al actualizar la información de contacto:', error);
          }
        );
      } else {
        this.contactService.createContact(updatedContact).subscribe(
          () => {
            console.log('Información de contacto creada');
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error al crear la información de contacto:', error);
          }
        );
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}