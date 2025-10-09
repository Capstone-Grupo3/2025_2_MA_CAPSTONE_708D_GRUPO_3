'use client';

import { useState } from 'react';
import { 
  Building2,
  Briefcase, 
  Users, 
  LogOut, 
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  DollarSign,
  TrendingUp,
  Search,
  Filter
} from 'lucide-react';

// Importar tipos centralizados
import { PostulacionDetalle } from '@/types';

// Importar hook personalizado
import { useEmpresaDashboard } from '@/hooks/useEmpresaDashboard';

// Importar utilidades
import { 
  formatDate, 
  formatCurrency, 
  getEstadoColor,
  getTipoContratoLabel 
} from '@/lib/formatters';

export default function DashboardEmpresaPage() {
  // Usar hook personalizado para toda la lógica de datos
  const { 
    empresa, 
    vacantes, 
    loading, 
    logout,
    deleteVacante,
    toggleVacanteStatus
  } = useEmpresaDashboard();

  // Estados locales de UI
  const [activeTab, setActiveTab] = useState<'vacantes' | 'postulaciones' | 'crear' | 'perfil'>('vacantes');
  const [postulaciones, setPostulaciones] = useState<PostulacionDetalle[]>([]);
  
  // Estado para crear vacante
  const [nuevaVacante, setNuevaVacante] = useState({
    titulo: '',
    descripcion: '',
    ubicacion: '',
    salario: '',
    tipoContrato: 'FULL_TIME',
    modalidad: 'PRESENCIAL',
    requisitos: '',
    pregunta1: '',
    pregunta2: '',
    pregunta3: '',
  });

  const handleLogout = () => {
    logout();
  };

  const handleDeleteVacante = async (vacanteId: number) => {
    if (confirm('¿Estás seguro de eliminar esta vacante?')) {
      const success = await deleteVacante(vacanteId);
      if (success) {
        alert('Vacante eliminada correctamente');
      }
    }
  };

  const handleToggleVacante = async (vacanteId: number, activa: boolean) => {
    const success = await toggleVacanteStatus(vacanteId, !activa);
    if (success) {
      alert(`Vacante ${!activa ? 'activada' : 'desactivada'} correctamente`);
    }
  };

  const fetchPostulacionesByVacante = async (vacanteId: number) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/postulaciones/vacante/${vacanteId}`, {
        headers,
      });
      
      if (response.ok) {
        const data = await response.json();
        setPostulaciones(data);
        setActiveTab('postulaciones');
      }
    } catch (error) {
      console.error('Error fetching postulaciones:', error);
    }
  };

  const handleCrearVacante = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vacantes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: nuevaVacante.titulo,
          descripcion: nuevaVacante.descripcion,
          ubicacion: nuevaVacante.ubicacion,
          salarioEstimado: nuevaVacante.salario ? parseFloat(nuevaVacante.salario) : undefined,
          tipoContrato: nuevaVacante.tipoContrato,
          modalidad: nuevaVacante.modalidad,
          requisitos: nuevaVacante.requisitos,
          preguntasJson: {
            preguntas: [
              nuevaVacante.pregunta1,
              nuevaVacante.pregunta2,
              nuevaVacante.pregunta3,
            ].filter(p => p.trim() !== ''),
          },
        }),
      });

      if (response.ok) {
        alert('¡Vacante creada exitosamente!');
        setNuevaVacante({
          titulo: '',
          descripcion: '',
          ubicacion: '',
          salario: '',
          tipoContrato: 'FULL_TIME',
          modalidad: 'PRESENCIAL',
          requisitos: '',
          pregunta1: '',
          pregunta2: '',
          pregunta3: '',
        });
        setActiveTab('vacantes');
        window.location.reload();
      } else {
        alert('Error al crear la vacante');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear la vacante');
    }
  };

  const handleEliminarVacante = async (vacanteId: number) => {
    if (!confirm('¿Estás seguro de eliminar esta vacante?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/vacantes/${vacanteId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert('Vacante eliminada');
        window.location.reload();
      } else {
        alert('Error al eliminar la vacante');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar la vacante');
    }
  };

  const handleCambiarEstadoPostulacion = async (
    postulacionId: number,
    nuevoEstado: string
  ) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/postulaciones/${postulacionId}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ estado: nuevoEstado }),
        }
      );

      if (response.ok) {
        alert(`Postulación ${nuevoEstado.toLowerCase()}`);
        // Recargar postulaciones
        if (postulaciones.length > 0 && postulaciones[0].vacante?.id) {
          fetchPostulacionesByVacante(postulaciones[0].vacante.id);
        }
      } else {
        alert('Error al actualizar la postulación');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar la postulación');
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

  const postulacionesPendientes = postulaciones.filter(p => p.estado === 'PENDIENTE').length;
  const postulacionesAprobadas = postulaciones.filter(p => p.estado === 'SELECCIONADO').length;
  const vacantesActivas = vacantes.filter(v => v.activa).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Portal de Empresa</h1>
                <p className="text-sm text-gray-600">{empresa?.nombre}</p>
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

      {/* Stats Cards */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Vacantes Activas</p>
                  <p className="text-3xl font-bold text-blue-700 mt-1">{vacantesActivas}</p>
                </div>
                <Briefcase className="w-10 h-10 text-blue-600 opacity-50" />
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-medium">Pendientes</p>
                  <p className="text-3xl font-bold text-yellow-700 mt-1">{postulacionesPendientes}</p>
                </div>
                <Clock className="w-10 h-10 text-yellow-600 opacity-50" />
              </div>
            </div>
            
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Aprobadas</p>
                  <p className="text-3xl font-bold text-green-700 mt-1">{postulacionesAprobadas}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-600 opacity-50" />
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Total Postulaciones</p>
                  <p className="text-3xl font-bold text-purple-700 mt-1">{postulaciones.length}</p>
                </div>
                <Users className="w-10 h-10 text-purple-600 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>

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
                <Briefcase size={20} />
                Mis Vacantes ({vacantes.length})
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
                <Users size={20} />
                Postulaciones ({postulaciones.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('crear')}
              className={`py-4 px-2 border-b-2 font-medium transition-all ${
                activeTab === 'crear'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Plus size={20} />
                Crear Vacante
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
                <Building2 size={20} />
                Mi Perfil
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mis Vacantes Tab */}
        {activeTab === 'vacantes' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Mis Vacantes ({vacantes.length})
              </h2>
              <button
                onClick={() => setActiveTab('crear')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                <Plus size={20} />
                Nueva Vacante
              </button>
            </div>

            <div className="space-y-4">
              {vacantes.map((vacante) => (
                <div
                  key={vacante.id}
                  className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">
                          {vacante.titulo}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            vacante.activa
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {vacante.activa ? 'Activa' : 'Inactiva'}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {vacante.descripcion}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          {vacante.ubicacion}
                        </div>
                        {vacante.salario && (
                          <div className="flex items-center gap-1">
                            <DollarSign size={16} />
                            ${vacante.salario.toLocaleString()} CLP
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          {vacante.tipoContrato}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={16} />
                          {vacante._count?.postulaciones || 0} postulaciones
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEliminarVacante(vacante.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Eliminar"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {vacantes.length === 0 && (
                <div className="text-center py-12">
                  <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    No tienes vacantes publicadas
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Crea tu primera vacante para empezar a recibir postulaciones
                  </p>
                  <button
                    onClick={() => setActiveTab('crear')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  >
                    Crear Vacante
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Postulaciones Tab */}
        {activeTab === 'postulaciones' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Postulaciones Recibidas ({postulaciones.length})
            </h2>

            <div className="space-y-4">
              {postulaciones.map((postulacion) => (
                <div
                  key={postulacion.id}
                  className="bg-white rounded-xl shadow-sm border p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">
                          {postulacion.candidato.nombre}
                        </h3>
                        {postulacion.scoreCompatibilidad && (
                          <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 rounded-full">
                            <TrendingUp size={16} className="text-blue-600" />
                            <span className="text-sm font-bold text-blue-600">
                              {postulacion.scoreCompatibilidad}% match
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="text-gray-600 mb-3">
                        Vacante: <span className="font-medium">{postulacion.vacante.titulo}</span>
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <div>{postulacion.candidato.correo}</div>
                        {postulacion.candidato.telefono && (
                          <div>{postulacion.candidato.telefono}</div>
                        )}
                        {postulacion.candidato.experienciaAnios !== undefined && (
                          <div>{postulacion.candidato.experienciaAnios} años de experiencia</div>
                        )}
                      </div>

                      {postulacion.candidato.linkedinUrl && (
                        <a
                          href={postulacion.candidato.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Ver perfil en LinkedIn →
                        </a>
                      )}
                    </div>

                    <div className="ml-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(postulacion.estado)}`}>
                        {postulacion.estado}
                      </span>
                    </div>
                  </div>

                  {postulacion.estado === 'PENDIENTE' && (
                    <div className="flex gap-3 pt-4 border-t">
                      <button
                        onClick={() => handleCambiarEstadoPostulacion(postulacion.id, 'SELECCIONADO')}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                      >
                        <CheckCircle size={20} />
                        Aprobar
                      </button>
                      <button
                        onClick={() => handleCambiarEstadoPostulacion(postulacion.id, 'Rechazado')}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                      >
                        <XCircle size={20} />
                        Rechazar
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {postulaciones.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    No hay postulaciones aún
                  </h3>
                  <p className="text-gray-600">
                    Las postulaciones aparecerán aquí cuando los candidatos apliquen a tus vacantes
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Crear Vacante Tab */}
        {activeTab === 'crear' && (
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Nueva Vacante</h2>

            <form onSubmit={handleCrearVacante} className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título de la Vacante *
                </label>
                <input
                  type="text"
                  required
                  value={nuevaVacante.titulo}
                  onChange={(e) => setNuevaVacante({ ...nuevaVacante, titulo: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Desarrollador Full Stack"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  rows={6}
                  required
                  value={nuevaVacante.descripcion}
                  onChange={(e) => setNuevaVacante({ ...nuevaVacante, descripcion: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe las responsabilidades y requisitos del puesto..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ubicación *
                  </label>
                  <input
                    type="text"
                    required
                    value={nuevaVacante.ubicacion}
                    onChange={(e) => setNuevaVacante({ ...nuevaVacante, ubicacion: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Santiago, Chile"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salario (CLP)
                  </label>
                  <input
                    type="number"
                    value={nuevaVacante.salario}
                    onChange={(e) => setNuevaVacante({ ...nuevaVacante, salario: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1500000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Contrato *
                  </label>
                  <select
                    required
                    value={nuevaVacante.tipoContrato}
                    onChange={(e) => setNuevaVacante({ ...nuevaVacante, tipoContrato: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="FULL_TIME">Tiempo Completo</option>
                    <option value="PART_TIME">Medio Tiempo</option>
                    <option value="PROJECT">Por Proyecto</option>
                    <option value="FREELANCE">Freelance</option>
                    <option value="INTERNSHIP">Práctica</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modalidad *
                  </label>
                  <select
                    required
                    value={nuevaVacante.modalidad}
                    onChange={(e) => setNuevaVacante({ ...nuevaVacante, modalidad: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="PRESENCIAL">Presencial</option>
                    <option value="REMOTO">Remoto</option>
                    <option value="HIBRIDO">Híbrido</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requisitos
                </label>
                <textarea
                  rows={4}
                  value={nuevaVacante.requisitos}
                  onChange={(e) => setNuevaVacante({ ...nuevaVacante, requisitos: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Lista los requisitos principales del puesto..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Preguntas para Candidatos (3 preguntas requeridas para análisis IA) *
                </label>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Pregunta 1 *</label>
                    <input
                      type="text"
                      required
                      value={nuevaVacante.pregunta1}
                      onChange={(e) => setNuevaVacante({ ...nuevaVacante, pregunta1: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ej: ¿Cuántos años de experiencia tienes con React y Node.js?"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Pregunta 2 *</label>
                    <input
                      type="text"
                      required
                      value={nuevaVacante.pregunta2}
                      onChange={(e) => setNuevaVacante({ ...nuevaVacante, pregunta2: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ej: Describe un proyecto complejo que hayas liderado"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Pregunta 3 *</label>
                    <input
                      type="text"
                      required
                      value={nuevaVacante.pregunta3}
                      onChange={(e) => setNuevaVacante({ ...nuevaVacante, pregunta3: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ej: ¿Qué experiencia tienes con PostgreSQL y bases de datos?"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all"
                >
                  Publicar Vacante
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('vacantes')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Perfil Tab */}
        {activeTab === 'perfil' && empresa && (
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Perfil de la Empresa</h2>

            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-blue-600" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{empresa.nombre}</h3>
                  <p className="text-gray-600 mb-4">{empresa.descripcion || 'Sin descripción'}</p>
                  <p className="text-sm text-gray-600">{empresa.correo}</p>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Estadísticas</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">{vacantes.length}</div>
                    <div className="text-sm text-gray-600 mt-1">Vacantes</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">{vacantesActivas}</div>
                    <div className="text-sm text-gray-600 mt-1">Activas</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-3xl font-bold text-yellow-600">{postulacionesPendientes}</div>
                    <div className="text-sm text-gray-600 mt-1">Pendientes</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">{postulaciones.length}</div>
                    <div className="text-sm text-gray-600 mt-1">Total</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
