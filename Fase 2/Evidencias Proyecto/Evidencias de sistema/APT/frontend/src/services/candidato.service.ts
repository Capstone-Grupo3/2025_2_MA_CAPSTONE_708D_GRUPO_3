/**
 * Servicio de Candidatos
 */

import { Candidato } from "@/types";
import apiService from "./api.service";

class CandidatoService {
  /**
   * Obtener perfil del candidato por ID
   */
  async getCandidatoProfile(id: number): Promise<Candidato> {
    return apiService.get<Candidato>(`/candidatos/${id}`);
  }

  /**
   * Actualizar perfil del candidato
   */
  async updateCandidato(
    id: number,
    data: Partial<Candidato>
  ): Promise<Candidato> {
    return apiService.patch<Candidato>(`/candidatos/${id}`, data);
  }

  /**
   * Obtener todos los candidatos (solo para empresas)
   */
  async getCandidatos(): Promise<Candidato[]> {
    return apiService.get<Candidato[]>("/candidatos");
  }
}

export const candidatoService = new CandidatoService();
export default candidatoService;
