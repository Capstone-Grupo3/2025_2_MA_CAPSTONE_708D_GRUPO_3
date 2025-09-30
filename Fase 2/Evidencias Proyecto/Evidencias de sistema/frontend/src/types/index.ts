export interface User {
  id: number;
  nombreCompleto: string;
  correo: string;
  rol: 'admin' | 'reclutador';
}

export interface Company {
  id: number;
  nombre: string;
  rut: string;
  correo: string;
  telefono: string;
  direccion?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: number;
  empresaId: number;
  creadaPorId: number;
  slug: string;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  modalidad: 'presencial' | 'híbrido' | 'remoto';
  tipoContrato: 'indefinido' | 'plazo fijo' | 'honorarios';
  cantidadVacantes: number;
  rangoSalarial?: string;
  estado: 'borrador' | 'abierta' | 'cerrada';
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  empresa?: Company;
}

export interface Candidate {
  id: number;
  nombreCompleto: string;
  correo: string;
  telefono: string;
  nacionalidad: string;
  fechaNacimiento: string;
  linkedin?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface Application {
  id: number;
  ofertaId: number;
  candidatoId: number;
  cvUrl: string;
  respuestas?: any;
  etapa: 'nueva' | 'preselección' | 'entrevista' | 'oferta' | 'contratado' | 'rechazado';
  fuente?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  job?: Job;
  candidate?: Candidate;
}

export interface LoginRequest {
  correo: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}