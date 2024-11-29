export interface Room {
  sala_id: number;
  nombre: string;
  capacidad: number;
  ubicacion_id: number;
  precio: number;
  disponible: boolean;
  actividad: string;
  descripcion?: string;
  img: string;
}