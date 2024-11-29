import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../models/room';
import { CommonModule } from '@angular/common';
import { materialModules } from '../../../models/material-imports';
import { UbicacionService } from '../../../services/ubicacion.service';
import { Ubicacion } from '../../../models/ubications';
import { Location } from '@angular/common';

@Component({
  standalone: true,
    selector: 'app-room-edit',
    imports: [CommonModule, ...materialModules, ReactiveFormsModule],
    templateUrl: './room-edit.component.html',
    styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {
  roomForm: FormGroup;
  ubicaciones: Ubicacion[] = [];
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  roomId: number;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private ubicacionService: UbicacionService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.roomForm = this.fb.group({
      nombre: ['', Validators.required],
      capacidad: ['', [Validators.required, Validators.min(1)]],
      ubicacion_id: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      disponible: [false, Validators.required],
      actividad: ['', Validators.required],
      descripcion: [''],
      img: ['']
    });

    this.roomId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadUbicaciones();
    this.loadRoom();
  }

  loadUbicaciones(): void {
    this.ubicacionService.getUbicaciones().subscribe((data: Ubicacion[]) => {
      this.ubicaciones = data;
    });
  }

  loadRoom(): void {
    this.roomService.getRoomById(this.roomId).subscribe((room: Room) => {
      this.roomForm.patchValue(room);
      this.imageUrl = room.img ?? null; // Asegurarse de que imageUrl sea string o null
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      if (this.selectedFile) {
        // Subir la imagen a Cloudinary y obtener la URL
        this.roomService.uploadImage(this.selectedFile).subscribe((response: any) => {
          this.roomForm.patchValue({ img: response.url });
          this.imageUrl = response.url;
          this.updateRoom();
        }, error => {
          console.error('Error al subir la imagen:', error);
        });
      } else {
        // Mantener la URL de la imagen existente si no se selecciona una nueva imagen
        this.roomForm.patchValue({ img: this.imageUrl });
        this.updateRoom();
      }
    }
  }

  updateRoom(): void {
    if (this.imageUrl) {
      this.roomService.updateRoom(this.roomId, this.roomForm.value).subscribe(() => {
        this.location.back(); // Navegar de regreso a la ruta anterior
      }, error => {
        console.error('Error al actualizar la sala:', error);
      });
    } else {
      console.error('No se puede actualizar la sala sin una URL de imagen.');
    }
  }

  onCancel(): void {
    this.location.back(); // Navegar de regreso a la ruta anterior
  }
}