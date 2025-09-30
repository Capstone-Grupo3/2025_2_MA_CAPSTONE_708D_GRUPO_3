# Proyecto APT – Asesorías Administrativas Digitales

## Descripción General
Este proyecto busca digitalizar procesos administrativos para una pyme conformada por dos socias que ofrecen servicios en:

- **Contabilidad:** manejo financiero y tributario.  
- **Recursos Humanos:** apoyo en contratación y gestión laboral.  

La solución contempla el desarrollo de una plataforma web con frontend en **Next.js**, backend en **NestJS** y base de datos en **Supabase (PostgreSQL)**, con un flujo de trabajo controlado mediante GitHub.

## Objetivos
- Optimizar la comunicación entre la pyme y sus clientes.  
- Digitalizar procesos contables y de RRHH.  
- Reducir tiempos de gestión administrativa.  
- Mejorar la escalabilidad y seguridad de la solución.

## Estructura del Proyecto

```
/
├── backend/          # NestJS + TypeScript
├── frontend/         # Next.js 14 + TypeScript + TailwindCSS
├── docs/            # Documentación del proyecto
└── README.md        # Este archivo
```

## Stack Tecnológico

### Backend
- **Framework:** NestJS
- **Lenguaje:** TypeScript
- **Base de datos:** PostgreSQL (via Supabase)
- **ORM:** Prisma
- **Autenticación:** JWT / Supabase Auth
- **Documentación:** Swagger

### Frontend
- **Framework:** Next.js 14
- **Lenguaje:** TypeScript
- **Estilos:** TailwindCSS
- **Estado:** React Query
- **Formularios:** React Hook Form + Zod

## Configuración de Desarrollo

### Pre-requisitos
- Node.js 18+
- npm/yarn
- PostgreSQL (o cuenta en Supabase)

### Backend
```bash
cd backend
npm install
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Convenciones de Git
- `main` → rama estable (producción)
- `develop` → rama de integración (testing)
- `feature/*` → nuevas funcionalidades
- `fix/*` → correcciones de bugs

## Estado del Proyecto
- [x] Configuración inicial
- [ ] Desarrollo del backend
- [ ] Desarrollo del frontend
- [ ] Integración y pruebas
- [ ] Deploy y documentación

## Contribución
Ver `docs/CONTRIBUTING.md` para las guías de contribución.