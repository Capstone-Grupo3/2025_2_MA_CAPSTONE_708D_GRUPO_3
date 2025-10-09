/**
 * Hook para el dashboard de la empresa
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { empresaService } from "@/services/empresa.service";
import { vacanteService } from "@/services/vacante.service";
import { authService } from "@/services/auth.service";
import { Empresa, VacanteDetalle } from "@/types";

export function useEmpresaDashboard() {
  const router = useRouter();
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [vacantes, setVacantes] = useState<VacanteDetalle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Cargar datos de la empresa
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Verificar autenticación
      const token = authService.getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      // Decodificar token para obtener ID
      const payload = JSON.parse(atob(token.split(".")[1]));
      const empresaId = payload.sub;

      console.log("🔍 Cargando datos para empresa ID:", empresaId);

      // Cargar perfil
      const perfilData = await empresaService.getEmpresaProfile(empresaId);
      console.log("🏢 Perfil empresa:", perfilData);
      setEmpresa(perfilData);

      // Cargar vacantes de la empresa
      const vacantesData = await vacanteService.getVacantesByEmpresa(empresaId);
      console.log("💼 Vacantes de la empresa:", vacantesData.length);
      setVacantes(vacantesData);
    } catch (err: any) {
      console.error("❌ Error cargando datos:", err);
      setError(err.message || "Error al cargar los datos");

      // Si es error de autenticación, redirigir a login
      if (err.statusCode === 401) {
        authService.logout();
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  /**
   * Recargar datos
   */
  const refresh = useCallback(() => {
    loadData();
  }, [loadData]);

  /**
   * Cerrar sesión
   */
  const logout = useCallback(() => {
    authService.logout();
    router.push("/login");
  }, [router]);

  /**
   * Eliminar vacante
   */
  const deleteVacante = useCallback(async (vacanteId: number) => {
    try {
      await vacanteService.deleteVacante(vacanteId);
      // Actualizar lista de vacantes
      setVacantes((prev) => prev.filter((v) => v.id !== vacanteId));
      return true;
    } catch (err: any) {
      console.error("❌ Error eliminando vacante:", err);
      setError(err.message || "Error al eliminar vacante");
      return false;
    }
  }, []);

  /**
   * Activar/Desactivar vacante
   */
  const toggleVacanteStatus = useCallback(
    async (vacanteId: number, activa: boolean) => {
      try {
        const updated = await vacanteService.toggleVacanteStatus(
          vacanteId,
          activa
        );
        // Actualizar la vacante en la lista
        setVacantes((prev) =>
          prev.map((v) => (v.id === vacanteId ? { ...v, activa } : v))
        );
        return true;
      } catch (err: any) {
        console.error("❌ Error actualizando estado de vacante:", err);
        setError(err.message || "Error al actualizar vacante");
        return false;
      }
    },
    []
  );

  // Cargar datos al montar
  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    empresa,
    vacantes,
    loading,
    error,
    refresh,
    logout,
    deleteVacante,
    toggleVacanteStatus,
  };
}
