/**
 * Tipos relacionados con Vacantes
 */

import { Empresa } from './empresa.types';

export type TipoContrato = 'INDEFINIDO' | 'PLAZO_FIJO' | 'HONORARIOS' | 'PART_TIME';
export type Modalidad = 'PRESENCIAL' | 'REMOTO' | 'HIBRIDO';

export interface Vacante {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  salario?: number;
  tipoContrato: string;
  fechaPublicacion: string;
  preguntasJson?: any;
  empresa: {
    nombre: string;
    logoUrl?: string;
  };
}

export interface VacanteDetalle {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion?: string;
  salario?: number;
  salario_min?: number;
  salario_max?: number;
  tipoContrato: string;
  tipo_contrato?: TipoContrato;
  modalidad?: Modalidad;
  fechaPublicacion: string;
  fecha_publicacion?: string;
  activa: boolean;
  estado: string;
  preguntasJson?: PreguntaVacante[];
  empresa: Empresa | {
    nombre: string;
    logoUrl?: string;
  };
  _count?: {
    postulaciones: number;
  };
}

export interface PreguntaVacante {
  pregunta: string;
  tipo: 'texto' | 'multiple' | 'si_no';
  opciones?: string[];
}

export interface CreateVacanteDTO {
  titulo: string;
  descripcion: string;
  ubicacion: string;
  salario_min?: number;
  salario_max?: number;
  tipo_contrato: TipoContrato;
  modalidad: Modalidad;
  requisitos?: string;
  preguntasJson?: PreguntaVacante[];
}
