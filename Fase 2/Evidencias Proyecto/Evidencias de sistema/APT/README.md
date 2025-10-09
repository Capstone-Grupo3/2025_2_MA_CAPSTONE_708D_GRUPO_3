# 🚀 APT - Advanced People Tracking

Portal de empleo inteligente con IA para optimizar el proceso de reclutamiento y selección de personal en MiPyMEs.

## 📋 Descripción

APT es un sistema integral que conecta empresas con candidatos, utilizando inteligencia artificial para evaluar automáticamente la compatibilidad entre el perfil del candidato y los requisitos de la vacante.

## ⚡ Inicio Rápido con Docker

**¿Quieres ejecutar todo el proyecto en 2 minutos?**

```powershell
# 1. Clonar el repositorio
git clone <url-repo>
cd APT

# 2. Configurar variables de entorno (ver más abajo)

# 3. Iniciar con Docker
.\start-mvp.ps1

# 4. Acceder a:
# - Frontend: http://localhost:3001
# - Backend API: http://localhost:3000/api
# - AI Service: http://localhost:8000/docs
# - n8n: http://localhost:5678 (admin/admin123)
```

**📚 Documentación completa:** Ver carpeta **[docs-mvp/](./docs-mvp/)**
- **[INICIO-RAPIDO.md](./docs-mvp/INICIO-RAPIDO.md)** - Guía de 5 minutos ⭐
- **[GUIA-MVP-DOCKER.md](./docs-mvp/GUIA-MVP-DOCKER.md)** - Documentación completa
- **[ARQUITECTURA-MVP.md](./docs-mvp/ARQUITECTURA-MVP.md)** - Diagramas del sistema
- **[CASOS-USO-N8N.md](./docs-mvp/CASOS-USO-N8N.md)** - Automatización con n8n
- **[CHECKLIST-MVP.md](./docs-mvp/CHECKLIST-MVP.md)** - Verificación paso a paso

## 🛠 Stack Tecnológico

### Frontend
- **Next.js 14** + React + TypeScript
- **TailwindCSS** para estilos
- **Zustand** para gestión de estado
- **Framer Motion** para animaciones
- JWT para autenticación

### Backend
- **NestJS** + TypeScript
- **Prisma ORM** (v5.22.0)
- **PostgreSQL** (Supabase)
- **JWT + Bcrypt** para seguridad
- REST API + Swagger

### Inteligencia Artificial
- **Python 3.11** + **FastAPI**
- **Hugging Face Transformers**
- **scikit-learn** + **spaCy** (es_core_news_sm)
- Análisis de CVs y respuestas

### Infraestructura
- **Docker** + Docker Compose
- **n8n** para automatización de workflows
- **Supabase** para base de datos y storage
- **GitHub Actions** para CI/CD

## 🏗 Arquitectura

```
APT/
├── backend/                    # NestJS API
│   ├── src/
│   ├── prisma/
│   ├── Dockerfile
│   ├── Dockerfile.dev         # ← NUEVO
│   └── .dockerignore          # ← NUEVO
│
├── frontend/                  # Next.js + React
│   ├── src/
│   ├── Dockerfile
│   ├── Dockerfile.dev         # ← NUEVO
│   ├── postcss.config.js      # ← NUEVO
│   └── .dockerignore          # ← NUEVO
│
├── ai/                        # Python FastAPI
│   ├── api/
│   ├── Dockerfile
│   └── .dockerignore          # ← NUEVO
│
├── n8n/                       # ← NUEVO
│   └── workflows/
│       ├── evaluacion-cv.json
│       └── recordatorio-entrevistas.json
│
├── docs-mvp/                  # ← NUEVO (Documentación completa)
│   ├── README.md              # Índice de documentación
│   ├── INICIO-RAPIDO.md       # Guía de 5 minutos
│   ├── GUIA-MVP-DOCKER.md     # Documentación completa
│   ├── ARQUITECTURA-MVP.md    # Diagramas del sistema
│   ├── CASOS-USO-N8N.md       # Automatización con n8n
│   ├── CHECKLIST-MVP.md       # Verificación paso a paso
│   └── RESUMEN.md             # Resumen ejecutivo
│
├── docker-compose.yml         # Para DB local
├── docker-compose.mvp.yml     # ← NUEVO (Completo con n8n)
│
├── start-mvp.ps1              # ← NUEVO (Script de inicio)
└── stop-mvp.ps1               # ← NUEVO (Script de detención)
    ├── CASOS-USO-N8N.md
    ├── CHECKLIST-MVP.md
    └── RESUMEN.md
```

## 🚀 Instalación

### Prerrequisitos
- Node.js >= 18
- Python >= 3.9
- Docker y Docker Compose
- PostgreSQL (o cuenta en Supabase)

### Configuración

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd APT
```

2. **Configurar variables de entorno**
```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env

# AI Service
cp ai/.env.example ai/.env
```

3. **Instalar dependencias**

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# AI Service
cd ../ai
pip install -r requirements.txt
```

4. **Configurar base de datos**
```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

5. **Ejecutar con Docker**
```bash
docker-compose up -d
```

## 🔧 Desarrollo

### Backend (NestJS)
```bash
cd backend
npm run start:dev
```
API disponible en: `http://localhost:3000`

### Frontend (Next.js)
```bash
cd frontend
npm run dev
```
Aplicación disponible en: `http://localhost:3001`

### AI Service (FastAPI)
```bash
cd ai
uvicorn api.main:app --reload --port 8000
```
API IA disponible en: `http://localhost:8000`

### n8n (Automatización)
```bash
docker run -it --rm -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n
```
n8n disponible en: `http://localhost:5678`

## 📚 Documentación

- [Contexto de Negocio](docs/CONTEXTO_NEGOCIO.md)
- [Stack Tecnológico](docs/TECH_STACK.md)
- [Base de Datos](docs/BASE_DATOS.md)
- [Backend NestJS](docs/BACKEND_NESTJS.md)
- [Frontend](docs/FRONTEND.md)
- [Estructura del Proyecto](docs/ESTRUCTURA_PROYECTO.md)

## 🔑 Características Principales

### Para Empresas
- ✅ Crear y gestionar vacantes
- ✅ Definir preguntas personalizadas
- ✅ Visualizar ranking de candidatos con IA
- ✅ Revisar CVs y respuestas
- ✅ Dashboard analítico

### Para Candidatos
- ✅ Explorar vacantes disponibles
- ✅ Postular con CV y respuestas
- ✅ Seguimiento de postulaciones
- ✅ Feedback automatizado
- ✅ Perfil personalizable

### Inteligencia Artificial
- ✅ Análisis automático de CVs
- ✅ Evaluación de respuestas
- ✅ Puntaje de compatibilidad
- ✅ Feedback generado por IA
- ✅ Ranking inteligente

## 🧪 Testing

```bash
# Backend
cd backend
npm run test

# Frontend
cd frontend
npm run test
```

## 📦 Despliegue

### Producción
- **Frontend**: Vercel
- **Backend**: Render / Railway
- **Base de Datos**: Supabase
- **AI Service**: Railway / Render

### CI/CD
GitHub Actions configurado para:
- Testing automático
- Build y validación
- Despliegue automático a producción

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte del Capstone Grupo 3 - 2025.

## 👥 Equipo

Proyecto desarrollado por el equipo de Magnolias Asesorías.

## 📞 Contacto

Para más información, consulta la documentación en la carpeta `docs/`.
