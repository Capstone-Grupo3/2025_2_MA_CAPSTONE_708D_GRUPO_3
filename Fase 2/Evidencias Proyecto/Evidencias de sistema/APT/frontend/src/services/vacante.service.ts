/**
 * Servicio de Vacantes
 */

import { Vacante, VacanteDetalle, CreateVacanteDTO } from "@/types";
import apiService from "./api.service";

class VacanteService {
  /**
   * Obtener todas las vacantes activas
   */
  async getVacantes(): Promise<Vacante[]> {
    return apiService.get<Vacante[]>("/vacantes");
  }

  /**
   * Obtener vacante por ID
   */
  async getVacanteById(id: number): Promise<VacanteDetalle> {
    return apiService.get<VacanteDetalle>(`/vacantes/${id}`);
  }

  /**
   * Obtener vacantes de una empresa
   */
  async getVacantesByEmpresa(empresaId: number): Promise<VacanteDetalle[]> {
    return apiService.get<VacanteDetalle[]>(`/vacantes/empresa/${empresaId}`);
  }

  /**
   * Crear nueva vacante
   */
  async createVacante(data: CreateVacanteDTO): Promise<VacanteDetalle> {
    return apiService.post<VacanteDetalle>("/vacantes", data);
  }

  /**
   * Actualizar vacante
   */
  async updateVacante(
    id: number,
    data: Partial<CreateVacanteDTO>
  ): Promise<VacanteDetalle> {
    return apiService.patch<VacanteDetalle>(`/vacantes/${id}`, data);
  }

  /**
   * Eliminar vacante
   */
  async deleteVacante(id: number): Promise<void> {
    return apiService.delete<void>(`/vacantes/${id}`);
  }

  /**
   * Activar/Desactivar vacante
   */
  async toggleVacanteStatus(
    id: number,
    activa: boolean
  ): Promise<VacanteDetalle> {
    return apiService.patch<VacanteDetalle>(`/vacantes/${id}`, { activa });
  }
}

export const vacanteService = new VacanteService();
export default vacanteService;
