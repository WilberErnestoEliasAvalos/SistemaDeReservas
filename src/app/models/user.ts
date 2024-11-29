export interface User {
  usuario_id: number;
  nombre: string;
  email: string;
  password: string;
  rol_id: number;
  contacto?: Contact; // Información de contacto opcional
}

export interface Contact {
  contacto_id: number;
  usuario_id: number;
  telefono: string;
  direccion: string;
}