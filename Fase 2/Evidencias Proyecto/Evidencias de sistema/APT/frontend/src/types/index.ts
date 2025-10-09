/**
 * Punto de entrada centralizado para todos los tipos
 */

// Candidato
export type {
  Candidato,
  CandidatoDetalle,
  CandidatoRanking,
} from "./candidato.types";

// Empresa
export type { Empresa, EmpresaDetalle } from "./empresa.types";

// Vacante
export type {
  Vacante,
  VacanteDetalle,
  PreguntaVacante,
  CreateVacanteDTO,
  TipoContrato,
  Modalidad,
} from "./vacante.types";

// Postulación
export type {
  Postulacion,
  PostulacionDetalle,
  RespuestaPostulacion,
  CreatePostulacionDTO,
  PostulacionFormData,
  EstadoPostulacion,
} from "./postulacion.types";

// Auth
export type {
  LoginCredentials,
  LoginResponse,
  RegisterEmpresaDTO,
  RegisterCandidatoDTO,
  AuthUser,
  UserType,
} from "./auth.types";

// Common
export type { ApiResponse, PaginatedResponse, ApiError } from "./common.types";
