/**
 * Hook para el portal del candidato
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { candidatoService } from "@/services/candidato.service";
import { vacanteService } from "@/services/vacante.service";
import { postulacionService } from "@/services/postulacion.service";
import { authService } from "@/services/auth.service";
import { Candidato, Vacante, Postulacion } from "@/types";

export function useCandidatoPortal() {
  const router = useRouter();
  const [candidato, setCandidato] = useState<Candidato | null>(null);
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Cargar datos del candidato
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
      const candidatoId = payload.sub;

      console.log("🔍 Cargando datos para candidato ID:", candidatoId);

      // Cargar perfil
      const perfilData =
        await candidatoService.getCandidatoProfile(candidatoId);
      console.log("👤 Perfil candidato:", perfilData);
      setCandidato(perfilData);

      // Cargar vacantes activas
      const vacantesData = await vacanteService.getVacantes();
      console.log("💼 Vacantes disponibles:", vacantesData.length);
      setVacantes(vacantesData);

      // Cargar postulaciones del candidato
      const postulacionesData =
        await postulacionService.getPostulacionesByCandidato(candidatoId);
      console.log("📋 Postulaciones del candidato:", postulacionesData.length);
      setPostulaciones(postulacionesData);
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

  // Cargar datos al montar
  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    candidato,
    vacantes,
    postulaciones,
    loading,
    error,
    refresh,
    logout,
  };
}
