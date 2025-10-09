/**
 * Constantes de la aplicación
 */

import { TipoContrato, Modalidad, EstadoPostulacion } from '@/types';

/**
 * Labels para tipos de contrato
 */
export const TIPO_CONTRATO_LABELS: Record<TipoContrato, string> = {
  INDEFINIDO: 'Indefinido',
  PLAZO_FIJO: 'Plazo Fijo',
  HONORARIOS: 'Honorarios',
  PART_TIME: 'Part Time',
};

/**
 * Labels para modalidades
 */
export const MODALIDAD_LABELS: Record<Modalidad, string> = {
  PRESENCIAL: 'Presencial',
  REMOTO: 'Remoto',
  HIBRIDO: 'Híbrido',
};

/**
 * Labels para estados de postulación
 */
export const ESTADO_POSTULACION_LABELS: Record<EstadoPostulacion, string> = {
  PENDIENTE: 'Pendiente',
  EN_REVISION: 'En Revisión',
  EVALUADO: 'Evaluado',
  RECHAZADO: 'Rechazado',
  SELECCIONADO: 'Seleccionado',
};

/**
 * Colores para estados de postulación
 */
export const ESTADO_POSTULACION_COLORS: Record<EstadoPostulacion, string> = {
  PENDIENTE: 'bg-yellow-100 text-yellow-800',
  EN_REVISION: 'bg-blue-100 text-blue-800',
  EVALUADO: 'bg-purple-100 text-purple-800',
  RECHAZADO: 'bg-red-100 text-red-800',
  SELECCIONADO: 'bg-green-100 text-green-800',
};

/**
 * Opciones de tipo de contrato para formularios
 */
export const TIPO_CONTRATO_OPTIONS: { value: TipoContrato; label: string }[] = [
  { value: 'INDEFINIDO', label: 'Indefinido' },
  { value: 'PLAZO_FIJO', label: 'Plazo Fijo' },
  { value: 'HONORARIOS', label: 'Honorarios' },
  { value: 'PART_TIME', label: 'Part Time' },
];

/**
 * Opciones de modalidad para formularios
 */
export const MODALIDAD_OPTIONS: { value: Modalidad; label: string }[] = [
  { value: 'PRESENCIAL', label: 'Presencial' },
  { value: 'REMOTO', label: 'Remoto' },
  { value: 'HIBRIDO', label: 'Híbrido' },
];

/**
 * Tipos de archivo permitidos para CV
 */
export const CV_ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

/**
 * Tamaño máximo de archivo (5MB)
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
