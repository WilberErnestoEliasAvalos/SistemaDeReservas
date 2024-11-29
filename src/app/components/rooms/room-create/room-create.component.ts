import { Component, OnInit } from '@angular/core';
import { materialModules } from '../../../models/material-imports';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from '../../../services/room.service';
import { CommonModule } from '@angular/common';
import { UbicacionService } from '../../../services/ubicacion.service';
import { Ubicacion } from '../../../models/ubications';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  standalone: true,
    selector: 'app-room-create',
    imports: [...materialModules, CommonModule, ReactiveFormsModule],
    templateUrl: './room-create.component.html',
    styleUrl: './room-create.component.css'
})
export class RoomCreateComponent implements OnInit {
  roomForm: FormGroup;
  ubicaciones: Ubicacion[] = [];
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  isSmallScreen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private ubicacionService: UbicacionService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
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
  }

  ngOnInit(): void {
    this.loadUbicaciones();
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  loadUbicaciones(): void {
    this.ubicacionService.getUbicaciones().subscribe((data: Ubicacion[]) => {
      this.ubicaciones = data;
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
          this.createRoom();
        }, error => {
          console.error('Error al subir la imagen:', error);
        });
      } else {
        console.error('Debe seleccionar una imagen antes de crear la sala.');
      }
    }
  }

  createRoom(): void {
    if (this.imageUrl) {
      this.roomService.createRoom(this.roomForm.value).subscribe(() => {
        this.router.navigate(['/rooms']);
      }, error => {
        console.error('Error al crear la sala:', error);
      });
    } else {
      console.error('No se puede crear la sala sin una URL de imagen.');
    }
  }

  onCancel(): void {
    this.router.navigate(['/rooms']);
  }

  getUbicacionDescripcion(ubicacion_id: number): string {
    const ubicacion = this.ubicaciones.find(u => u.ubicacion_id === ubicacion_id);
    return ubicacion ? ubicacion.descripcion : '';
  }
}