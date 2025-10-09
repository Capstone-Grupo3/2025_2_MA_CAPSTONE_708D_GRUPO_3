import Link from "next/link";
import { Briefcase, Target, Users, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white">
        <nav className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">APT</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Iniciar Sesión
            </Link>
            <Link
              href="/registro"
              className="rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
            >
              Registrarse
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-6 text-5xl font-bold text-gray-900">
          Reclutamiento Inteligente con IA
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          Optimiza tu proceso de selección con análisis automático de CVs y
          compatibilidad de candidatos
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/registro?tipo=empresa"
            className="rounded-lg bg-primary-600 px-8 py-3 text-lg font-semibold text-white hover:bg-primary-700"
          >
            Soy Empresa
          </Link>
          <Link
            href="/registro?tipo=candidato"
            className="rounded-lg border-2 border-primary-600 px-8 py-3 text-lg font-semibold text-primary-600 hover:bg-primary-50"
          >
            Soy Candidato
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          ¿Por qué elegir APT?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
            <div className="mb-4 flex justify-center">
              <Zap className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">
              Evaluación Automática
            </h3>
            <p className="text-gray-600">
              IA analiza CVs y respuestas para generar puntajes de
              compatibilidad
            </p>
          </div>

          <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
            <div className="mb-4 flex justify-center">
              <Target className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Ranking Inteligente</h3>
            <p className="text-gray-600">
              Los mejores candidatos aparecen primero según su afinidad
            </p>
          </div>

          <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
            <div className="mb-4 flex justify-center">
              <Users className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Gestión Centralizada</h3>
            <p className="text-gray-600">
              Administra vacantes y postulaciones desde un solo lugar
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">
            Comienza a reclutar de forma inteligente
          </h2>
          <p className="mb-8 text-lg">
            Únete a las empresas que ya usan IA para encontrar el talento ideal
          </p>
          <Link
            href="/registro?tipo=empresa"
            className="inline-block rounded-lg bg-white px-8 py-3 text-lg font-semibold text-primary-600 hover:bg-gray-100"
          >
            Crear Cuenta Gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>
            &copy; 2025 APT - Advanced People Tracking. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
