export interface Reservation {
  reserva_id: number;
  usuario_id: number;
  sala_id: number;
  fecha_reserva: string;
  hora_inicio: string;
  hora_fin: string;
  estado_reserva_id: number;
}