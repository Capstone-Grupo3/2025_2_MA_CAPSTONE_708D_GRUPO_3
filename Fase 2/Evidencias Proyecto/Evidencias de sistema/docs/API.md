# API Documentation

## Autenticación

### POST /auth/login
Iniciar sesión con credenciales de reclutador.

**Request Body:**
```json
{
  "correo": "usuario@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "jwt-token-here",
  "user": {
    "id": 1,
    "nombreCompleto": "Juan Pérez",
    "correo": "usuario@example.com",
    "rol": "reclutador"
  }
}
```

## Empresas

### GET /companies
Obtener lista de todas las empresas.

**Headers:**
- `Authorization: Bearer {token}`

**Response:**
```json
[
  {
    "id": 1,
    "nombre": "Empresa Ejemplo",
    "rut": "12.345.678-9",
    "correo": "contacto@empresa.com",
    "telefono": "+56912345678",
    "direccion": "Calle Ejemplo 123",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

### POST /companies
Crear nueva empresa.

**Headers:**
- `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "nombre": "Nueva Empresa",
  "rut": "98.765.432-1",
  "correo": "nueva@empresa.com",
  "telefono": "+56987654321",
  "direccion": "Nueva Dirección 456"
}
```

### GET /companies/:id
Obtener empresa por ID.

### PATCH /companies/:id
Actualizar empresa.

### DELETE /companies/:id
Eliminar empresa.

## Ofertas Laborales

### GET /jobs
Obtener lista de ofertas laborales.

**Query Parameters:**
- `estado` - Filtrar por estado (borrador, abierta, cerrada)
- `empresaId` - Filtrar por empresa
- `page` - Página (default: 1)
- `limit` - Límite por página (default: 10)

### POST /jobs
Crear nueva oferta laboral.

**Request Body:**
```json
{
  "empresaId": 1,
  "titulo": "Desarrollador Full Stack",
  "descripcion": "Descripción de la oferta...",
  "ubicacion": "Santiago, Chile",
  "modalidad": "híbrido",
  "tipoContrato": "indefinido",
  "cantidadVacantes": 2,
  "rangoSalarial": "$1.000.000 - $1.500.000"
}
```

### GET /jobs/:id
Obtener oferta por ID.

### PATCH /jobs/:id
Actualizar oferta.

### DELETE /jobs/:id
Eliminar oferta (soft delete).

## Candidatos

### GET /candidates
Obtener lista de candidatos.

### POST /candidates
Crear nuevo candidato.

**Request Body:**
```json
{
  "nombreCompleto": "María González",
  "correo": "maria@example.com",
  "telefono": "+56912345678",
  "nacionalidad": "Chilena",
  "fechaNacimiento": "1990-01-01",
  "linkedin": "https://linkedin.com/in/maria-gonzalez"
}
```

### GET /candidates/:id
Obtener candidato por ID.

### PATCH /candidates/:id
Actualizar candidato.

### DELETE /candidates/:id
Eliminar candidato (soft delete).

## Postulaciones

### GET /applications
Obtener lista de postulaciones.

**Query Parameters:**
- `ofertaId` - Filtrar por oferta
- `etapa` - Filtrar por etapa
- `candidatoId` - Filtrar por candidato

### POST /applications
Crear nueva postulación.

**Request Body:**
```json
{
  "ofertaId": 1,
  "candidatoId": 1,
  "cvUrl": "https://storage.com/cv.pdf",
  "respuestas": {
    "pregunta1": "Respuesta 1",
    "pregunta2": "Respuesta 2"
  },
  "fuente": "portal"
}
```

### PATCH /applications/:id/stage
Cambiar etapa de postulación.

**Request Body:**
```json
{
  "etapaNueva": "entrevista",
  "nota": "Candidato preseleccionado para entrevista"
}
```

## Códigos de Estado

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Autenticación Bearer Token

Todas las rutas (excepto `/auth/login`) requieren un token JWT en el header:

```
Authorization: Bearer {your-jwt-token}
```

El token se obtiene al hacer login exitoso y tiene una duración de 7 días.

## Swagger Documentation

La documentación completa de la API está disponible en:
```
http://localhost:3001/api/docs
```

Esta documentación incluye todos los endpoints, esquemas de datos y permite probar la API directamente desde el navegador.