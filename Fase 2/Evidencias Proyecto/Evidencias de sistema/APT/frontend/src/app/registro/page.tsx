"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, Eye, EyeOff, Building2, User } from "lucide-react";

export default function RegistroPage() {
  const router = useRouter();
  const [tipoUsuario, setTipoUsuario] = useState<"empresa" | "candidato">(
    "candidato"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Formulario Empresa
  const [empresaForm, setEmpresaForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    descripcion: "",
    logoUrl: "",
  });

  // Formulario Candidato
  const [candidatoForm, setCandidatoForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    telefono: "",
    linkedinUrl: "",
    skillsJson: {},
    experienciaAnios: 0,
  });

  const handleSubmitEmpresa = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/empresas`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(empresaForm),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar empresa");
      }

      // Redirigir a login después del registro exitoso
      router.push("/login?registered=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCandidato = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/candidatos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(candidatoForm),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar candidato");
      }

      router.push("/login?registered=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Crear Cuenta</h1>
            <p className="text-gray-600 mt-2">
              Únete a nuestra plataforma de reclutamiento
            </p>
          </div>

          {/* Selector de tipo de usuario */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setTipoUsuario("candidato")}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all flex items-center justify-center gap-2 ${
                tipoUsuario === "candidato"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <User size={20} />
              Candidato
            </button>
            <button
              type="button"
              onClick={() => setTipoUsuario("empresa")}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all flex items-center justify-center gap-2 ${
                tipoUsuario === "empresa"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Building2 size={20} />
              Empresa
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          {/* Formulario Candidato */}
          {tipoUsuario === "candidato" && (
            <form onSubmit={handleSubmitCandidato} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={candidatoForm.nombre}
                  onChange={(e) =>
                    setCandidatoForm({
                      ...candidatoForm,
                      nombre: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Juan Pérez"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={candidatoForm.correo}
                    onChange={(e) =>
                      setCandidatoForm({
                        ...candidatoForm,
                        correo: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="juan@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={candidatoForm.telefono}
                    onChange={(e) =>
                      setCandidatoForm({
                        ...candidatoForm,
                        telefono: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+56 9 1234 5678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={candidatoForm.contrasena}
                    onChange={(e) =>
                      setCandidatoForm({
                        ...candidatoForm,
                        contrasena: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Perfil LinkedIn
                </label>
                <input
                  type="url"
                  value={candidatoForm.linkedinUrl}
                  onChange={(e) =>
                    setCandidatoForm({
                      ...candidatoForm,
                      linkedinUrl: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://linkedin.com/in/tu-perfil"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Años de Experiencia
                </label>
                <input
                  type="number"
                  min="0"
                  value={candidatoForm.experienciaAnios}
                  onChange={(e) =>
                    setCandidatoForm({
                      ...candidatoForm,
                      experienciaAnios: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Registrando..." : "Crear Cuenta"}
              </button>
            </form>
          )}

          {/* Formulario Empresa */}
          {tipoUsuario === "empresa" && (
            <form onSubmit={handleSubmitEmpresa} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Empresa *
                </label>
                <input
                  type="text"
                  required
                  value={empresaForm.nombre}
                  onChange={(e) =>
                    setEmpresaForm({ ...empresaForm, nombre: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Empresa S.A."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={empresaForm.correo}
                  onChange={(e) =>
                    setEmpresaForm({ ...empresaForm, correo: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="contacto@empresa.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={empresaForm.contrasena}
                    onChange={(e) =>
                      setEmpresaForm({
                        ...empresaForm,
                        contrasena: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  rows={4}
                  value={empresaForm.descripcion}
                  onChange={(e) =>
                    setEmpresaForm({
                      ...empresaForm,
                      descripcion: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descripción de tu empresa..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo URL (opcional)
                </label>
                <input
                  type="url"
                  value={empresaForm.logoUrl}
                  onChange={(e) =>
                    setEmpresaForm({ ...empresaForm, logoUrl: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://ejemplo.com/logo.png"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Registrando..." : "Crear Cuenta"}
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link
                href="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
