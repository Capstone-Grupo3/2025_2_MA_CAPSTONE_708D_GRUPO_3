/**
 * Tipos relacionados con Postulaciones
 */

import { Candidato } from "./candidato.types";
import { Vacante } from "./vacante.types";

export type EstadoPostulacion =
  | "PENDIENTE"
  | "EN_REVISION"
  | "EVALUADO"
  | "RECHAZADO"
  | "SELECCIONADO";

export interface Postulacion {
  id: number;
  fechaPostulacion: string;
  estado: string;
  scoreCompatibilidad?: number;
  puntajeIa?: number;
  feedbackIa?: string;
  vacante: {
    titulo: string;
    empresa: {
      nombre: string;
    };
  };
}

export interface PostulacionDetalle {
  id: number;
  fechaPostulacion: string;
  estado: EstadoPostulacion;
  scoreCompatibilidad?: number;
  puntajeIa?: number;
  feedbackIa?: string;
  respuestasJson?: RespuestaPostulacion[];
  cvUrl?: string;
  candidato: Candidato;
  vacante: Vacante & {
    id: number;
    titulo: string;
  };
}

export interface RespuestaPostulacion {
  pregunta: string;
  respuesta: string;
}

export interface CreatePostulacionDTO {
  cv_file: File | null;
  cv_url?: string;
  respuestas_json: RespuestaPostulacion[];
}

export interface PostulacionFormData {
  vacanteId: number;
  candidatoId: number;
  cvFile?: File;
  cvUrl?: string;
  respuestasJson?: RespuestaPostulacion[];
}
