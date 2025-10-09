'use client';

import { useState } from 'react';
import { 
  User, 
  Briefcase, 
  FileText, 
  LogOut, 
  Search,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp
} from 'lucide-react';

// Importar tipos centralizados
import { Vacante } from '@/types';

// Importar hook personalizado
import { useCandidatoPortal } from '@/hooks/useCandidatoPortal';

// Importar utilidades
import { formatDate, getEstadoColor, formatCurrency } from '@/lib/formatters';

export default function PortalCandidatoPage() {
  // Usar hook personalizado para toda la lógica
  const { 
    candidato, 
    vacantes, 
    postulaciones, 
    loading, 
    logout 
  } = useCandidatoPortal();

  // Estados locales de UI
  const [activeTab, setActiveTab] = useState<'vacantes' | 'postulaciones' | 'perfil'>('vacantes');
  const [showModal, setShowModal] = useState(false);
  const [vacanteSeleccionada, setVacanteSeleccionada] = useState<Vacante | null>(null);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handlePostular = (vacante: Vacante) => {
    setVacanteSeleccionada(vacante);
    setRespuestas({});
    setShowModal(true);
  };

  const handleCerrarModal = () => {
    setShowModal(false);
    setVacanteSeleccionada(null);
    setRespuestas({});
  };

  const handleEnviarPostulacion = async () => {
    if (!vacanteSeleccionada || !candidato) return;

    // Validar que todas las preguntas estén respondidas
    const preguntas = vacanteSeleccionada.preguntasJson?.preguntas || [];
    if (preguntas.length > 0) {
      const todasRespondidas = preguntas.every(
        (_: any, index: number) => respuestas[`pregunta_${index + 1}`]?.trim()
      );
      if (!todasRespondidas) {
        alert('Por favor responde todas las preguntas antes de enviar');
        return;
      }
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/postulaciones`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idVacante: vacanteSeleccionada.id,
          respuestasJson: respuestas,
        }),
      });

      if (response.ok) {
        alert('¡Postulación enviada exitosamente! El análisis con IA se está procesando.');
        handleCerrarModal();
        window.location.reload(); // Recargar página para actualizar datos
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || 'Error al enviar la postulación');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar la postulación');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Portal de Candidato</h1>
                <p className="text-sm text-gray-600">{candidato?.nombre}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut size={20} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('vacantes')}
              className={`py-4 px-2 border-b-2 font-medium transition-all ${
                activeTab === 'vacantes'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Search size={20} />
                Vacantes Disponibles
              </div>
            </button>
            <button
              onClick={() => setActiveTab('postulaciones')}
              className={`py-4 px-2 border-b-2 font-medium transition-all ${
                activeTab === 'postulaciones'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText size={20} />
                Mis Postulaciones ({postulaciones.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('perfil')}
              className={`py-4 px-2 border-b-2 font-medium transition-all ${
                activeTab === 'perfil'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <User size={20} />
                Mi Perfil
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Vacantes Tab */}
        {activeTab === 'vacantes' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Vacantes Disponibles ({vacantes.length})
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {vacantes.map((vacante) => (
                <div
                  key={vacante.id}
                  className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {vacante.titulo}
                      </h3>
                      <p className="text-gray-600 font-medium">{vacante.empresa.nombre}</p>
                    </div>
                    {vacante.empresa.logoUrl && (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {vacante.descripcion}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} />
                      <span className="text-sm">{vacante.ubicacion}</span>
                    </div>
                    {vacante.salario && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign size={16} />
                        <span className="text-sm">
                          {formatCurrency(vacante.salario)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} />
                      <span className="text-sm">{vacante.tipoContrato}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePostular(vacante)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all font-medium"
                  >
                    Postular Ahora
                  </button>
                </div>
              ))}

              {vacantes.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    No hay vacantes disponibles
                  </h3>
                  <p className="text-gray-600">
                    Vuelve más tarde para ver nuevas oportunidades
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Postulaciones Tab */}
        {activeTab === 'postulaciones' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Mis Postulaciones ({postulaciones.length})
            </h2>

            <div className="space-y-4">
              {postulaciones.map((postulacion) => (
                <div
                  key={postulacion.id}
                  className="bg-white rounded-xl shadow-sm border p-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {postulacion.vacante.titulo}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {postulacion.vacante.empresa.nombre}
                      </p>

                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock size={16} />
                          <span className="text-sm">
                            {formatDate(postulacion.fechaPostulacion)}
                          </span>
                        </div>
                        <div>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(postulacion.estado)}`}>
                            {postulacion.estado}
                          </span>
                        </div>
                      </div>
                    </div>

                    {postulacion.scoreCompatibilidad && (
                      <div className="text-center">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="text-blue-600" size={20} />
                          <span className="text-sm text-gray-600">Score</span>
                        </div>
                        <div className="text-3xl font-bold text-blue-600">
                          {postulacion.scoreCompatibilidad}%
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {postulaciones.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    No tienes postulaciones aún
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Explora las vacantes disponibles y postula a las que te interesen
                  </p>
                  <button
                    onClick={() => setActiveTab('vacantes')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  >
                    Ver Vacantes
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Perfil Tab */}
        {activeTab === 'perfil' && candidato && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Mi Perfil</h2>

            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <p className="text-lg text-gray-800">{candidato.nombre}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <p className="text-lg text-gray-800">{candidato.correo}</p>
                </div>

                {candidato.telefono && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <p className="text-lg text-gray-800">{candidato.telefono}</p>
                  </div>
                )}

                {candidato.experienciaAnios !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Años de Experiencia
                    </label>
                    <p className="text-lg text-gray-800">{candidato.experienciaAnios} años</p>
                  </div>
                )}

                {candidato.linkedinUrl && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Perfil de LinkedIn
                    </label>
                    <a
                      href={candidato.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {candidato.linkedinUrl}
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Estadísticas</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      {postulaciones.length}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Postulaciones</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      {postulaciones.filter(p => p.estado === 'Aprobado').length}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Aprobadas</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-3xl font-bold text-yellow-600">
                      {postulaciones.filter(p => p.estado === 'Pendiente').length}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Pendientes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal de Postulación */}
      {showModal && vacanteSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">
                Postular a {vacanteSeleccionada.titulo}
              </h3>
              <button
                onClick={handleCerrarModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                disabled={submitting}
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  {vacanteSeleccionada.empresa.nombre}
                </h4>
                <p className="text-sm text-blue-700">
                  {vacanteSeleccionada.ubicacion} • {vacanteSeleccionada.tipoContrato}
                </p>
              </div>

              {vacanteSeleccionada.preguntasJson?.preguntas?.length > 0 ? (
                <>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Responde las siguientes preguntas:
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Estas respuestas serán analizadas por IA para evaluar tu compatibilidad con la vacante.
                    </p>
                  </div>

                  {vacanteSeleccionada.preguntasJson.preguntas.map((pregunta: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {index + 1}. {pregunta.pregunta || pregunta}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={respuestas[`pregunta_${index + 1}`] || ''}
                        onChange={(e) => setRespuestas({
                          ...respuestas,
                          [`pregunta_${index + 1}`]: e.target.value
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                        placeholder="Escribe tu respuesta aquí..."
                        disabled={submitting}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <p className="text-gray-600">
                    Esta vacante no tiene preguntas específicas. Puedes postular directamente.
                  </p>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-3 justify-end">
              <button
                onClick={handleCerrarModal}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                disabled={submitting}
              >
                Cancelar
              </button>
              <button
                onClick={handleEnviarPostulacion}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={submitting}
              >
                {submitting ? 'Enviando...' : 'Enviar Postulación'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
