/**
 * Tipos relacionados con Autenticación
 */

export type UserType = 'empresa' | 'candidato';

export interface LoginCredentials {
  correo: string;
  contrasena: string;
}

export interface LoginResponse {
  access_token: string;
  userType?: UserType;
}

export interface RegisterEmpresaDTO {
  nombre: string;
  correo: string;
  contrasena: string;
  descripcion?: string;
  rut?: string;
}

export interface RegisterCandidatoDTO {
  nombre: string;
  correo: string;
  contrasena: string;
  telefono?: string;
  linkedinUrl?: string;
}

export interface AuthUser {
  id: number;
  nombre: string;
  correo: string;
  tipo: UserType;
}
