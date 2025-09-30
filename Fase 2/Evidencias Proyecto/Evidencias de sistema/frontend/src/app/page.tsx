import Link from 'next/link';
import { Building2, Users, Briefcase, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-primary-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">APT</h1>
            </div>
            <nav className="flex space-x-8">
              <Link href="/login" className="btn-primary px-4 py-2">
                Iniciar Sesión
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Asesorías Administrativas
            <span className="block text-primary-600">Digitales</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Digitaliza tus procesos administrativos de contabilidad y recursos humanos.
            Optimiza la comunicación con tus clientes y reduce los tiempos de gestión.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card text-center">
            <Building2 className="h-12 w-12 text-primary-600 mx-auto" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Gestión de Empresas</h3>
            <p className="mt-2 text-base text-gray-500">
              Administra la información de tus clientes empresariales de forma centralizada.
            </p>
          </div>
          
          <div className="card text-center">
            <Users className="h-12 w-12 text-primary-600 mx-auto" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Recursos Humanos</h3>
            <p className="mt-2 text-base text-gray-500">
              Gestiona procesos de contratación y administración de personal.
            </p>
          </div>
          
          <div className="card text-center">
            <Briefcase className="h-12 w-12 text-primary-600 mx-auto" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Contabilidad</h3>
            <p className="mt-2 text-base text-gray-500">
              Manejo financiero y tributario digitalizado y eficiente.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link 
            href="/login" 
            className="btn-primary px-8 py-3 text-lg"
          >
            Comenzar Ahora
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 APT - Asesorías Administrativas Digitales. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}