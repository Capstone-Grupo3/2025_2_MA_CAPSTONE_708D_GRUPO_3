/**
 * Servicio de Autenticación
 */

import { LoginCredentials, LoginResponse } from '@/types';
import apiService from './api.service';

class AuthService {
  /**
   * Login de empresa
   */
  async loginEmpresa(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiService.post<LoginResponse>(
      '/auth/login/empresa',
      credentials,
      false // No requiere autenticación
    );
    
    return response;
  }

  /**
   * Login de candidato
   */
  async loginCandidato(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiService.post<LoginResponse>(
      '/auth/login/candidato',
      credentials,
      false // No requiere autenticación
    );
    
    return response;
  }

  /**
   * Logout (limpiar datos locales)
   */
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
    }
  }

  /**
   * Obtener token actual
   */
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  /**
   * Obtener tipo de usuario actual
   */
  getUserType(): 'empresa' | 'candidato' | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userType') as 'empresa' | 'candidato' | null;
    }
    return null;
  }

  /**
   * Verificar si está autenticado
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Guardar token y tipo de usuario
   */
  saveAuth(token: string, userType: 'empresa' | 'candidato'): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);
    }
  }
}

export const authService = new AuthService();
export default authService;
