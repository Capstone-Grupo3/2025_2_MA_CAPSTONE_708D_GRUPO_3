/**
 * Tipos relacionados con Candidatos
 */

export interface Candidato {
  id: number;
  nombre: string;
  correo: string;
  telefono?: string;
  linkedinUrl?: string;
  experienciaAnios?: number;
}

export interface CandidatoDetalle extends Candidato {
  // Campos adicionales para vista detallada
  habilidades?: string[];
  educacion?: string;
  descripcion?: string;
}

export interface CandidatoRanking {
  id: number;
  nombre_completo: string;
  email: string;
  puntajeIa: number;
  feedback?: string;
  fecha_postulacion: string;
}
