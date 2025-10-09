/**
 * Servicio de Postulaciones
 */

import { Postulacion, PostulacionDetalle, PostulacionFormData } from '@/types';
import apiService from './api.service';

class PostulacionService {
  /**
   * Obtener postulaciones de un candidato
   */
  async getPostulacionesByCandidato(candidatoId: number): Promise<Postulacion[]> {
    return apiService.get<Postulacion[]>(`/postulaciones/candidato/${candidatoId}`);
  }

  /**
   * Obtener postulaciones de una vacante
   */
  async getPostulacionesByVacante(vacanteId: number): Promise<PostulacionDetalle[]> {
    return apiService.get<PostulacionDetalle[]>(`/postulaciones/vacante/${vacanteId}`);
  }

  /**
   * Obtener detalle de una postulación
   */
  async getPostulacionById(id: number): Promise<PostulacionDetalle> {
    return apiService.get<PostulacionDetalle>(`/postulaciones/${id}`);
  }

  /**
   * Crear nueva postulación
   */
  async createPostulacion(data: PostulacionFormData): Promise<PostulacionDetalle> {
    const formData = new FormData();
    
    formData.append('vacanteId', data.vacanteId.toString());
    formData.append('candidatoId', data.candidatoId.toString());
    
    if (data.cvFile) {
      formData.append('cv', data.cvFile);
    }
    
    if (data.cvUrl) {
      formData.append('cvUrl', data.cvUrl);
    }
    
    if (data.respuestasJson) {
      formData.append('respuestasJson', JSON.stringify(data.respuestasJson));
    }

    return apiService.postFormData<PostulacionDetalle>('/postulaciones', formData);
  }

  /**
   * Actualizar estado de postulación
   */
  async updatePostulacionEstado(
    id: number, 
    estado: string
  ): Promise<PostulacionDetalle> {
    return apiService.patch<PostulacionDetalle>(`/postulaciones/${id}`, { estado });
  }
}

export const postulacionService = new PostulacionService();
export default postulacionService;
