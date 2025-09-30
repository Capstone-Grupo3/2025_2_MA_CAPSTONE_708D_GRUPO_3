# Guía de Instalación y Configuración

## Pre-requisitos

- Node.js 18+ ([descargar aquí](https://nodejs.org/))
- npm o yarn
- PostgreSQL (o cuenta en Supabase)
- Git

## Configuración del Backend

### 1. Instalar dependencias
```bash
cd backend
npm install
```

### 2. Configurar variables de entorno
```bash
# Copiar el archivo de ejemplo
copy .env.example .env

# Editar .env con tus configuraciones
notepad .env
```

Variables requeridas:
- `DATABASE_URL`: URL de conexión a PostgreSQL
- `JWT_SECRET`: Clave secreta para JWT
- `FRONTEND_URL`: URL del frontend (http://localhost:3000)

### 3. Configurar base de datos
```bash
# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev --name init

# (Opcional) Abrir Prisma Studio
npx prisma studio
```

### 4. Ejecutar en desarrollo
```bash
npm run start:dev
```

El backend estará disponible en: http://localhost:3001
Documentación Swagger: http://localhost:3001/api/docs

## Configuración del Frontend

### 1. Instalar dependencias
```bash
cd frontend
npm install
```

### 2. Configurar variables de entorno
```bash
# Copiar el archivo de ejemplo
copy .env.local.example .env.local

# Editar .env.local
notepad .env.local
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

El frontend estará disponible en: http://localhost:3000

## Estructura del Proyecto

```
/
├── backend/          # API NestJS
│   ├── src/
│   │   ├── modules/  # Módulos de la aplicación
│   │   ├── common/   # Utilidades compartidas
│   │   └── main.ts   # Punto de entrada
│   ├── prisma/       # Esquema de base de datos
│   └── package.json
├── frontend/         # Aplicación Next.js
│   ├── src/
│   │   ├── app/      # Rutas y páginas
│   │   ├── components/ # Componentes reutilizables
│   │   ├── lib/      # Utilidades y configuraciones
│   │   └── types/    # Definiciones de tipos
│   └── package.json
└── docs/            # Documentación del proyecto
```

## Scripts Disponibles

### Backend
- `npm run start:dev` - Desarrollo con hot reload
- `npm run build` - Compilar para producción
- `npm run start:prod` - Ejecutar en producción
- `npm run db:migrate` - Ejecutar migraciones
- `npm run db:studio` - Abrir Prisma Studio

### Frontend
- `npm run dev` - Desarrollo con hot reload
- `npm run build` - Compilar para producción
- `npm run start` - Ejecutar en producción
- `npm run lint` - Verificar linting

## Troubleshooting

### Error de conexión a base de datos
- Verificar que PostgreSQL esté ejecutándose
- Verificar la URL de conexión en `.env`
- Verificar permisos de usuario

### Error de CORS
- Verificar que `FRONTEND_URL` en backend coincida con la URL del frontend
- Verificar configuración de CORS en `main.ts`

### Error de autenticación
- Verificar que `JWT_SECRET` esté configurado
- Verificar que las cookies estén habilitadas en el navegador

## Enlaces Útiles

- [Documentación de NestJS](https://docs.nestjs.com/)
- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Prisma](https://www.prisma.io/docs)
- [Documentación de TailwindCSS](https://tailwindcss.com/docs)