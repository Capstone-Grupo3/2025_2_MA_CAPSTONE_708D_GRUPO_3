# Guía de Contribución

## Flujo de Trabajo con Git

### Convenciones de Ramas
- `main` → rama estable (producción)
- `develop` → rama de integración (testing)
- `feature/*` → nuevas funcionalidades
- `fix/*` → correcciones de bugs
- `hotfix/*` → correcciones urgentes en producción

### Workflow de Desarrollo

1. **Crear rama desde develop**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/nueva-funcionalidad
```

2. **Implementar la tarea asignada**
- Realizar cambios en el código
- Escribir tests si es necesario
- Actualizar documentación

3. **Hacer commit siguiendo Conventional Commits**
```bash
git add .
git commit -m "feat(auth): implementar login con JWT"
```

### Convenciones de Commit

Usar **Conventional Commits** para mensajes consistentes:

- `feat:` nueva funcionalidad
- `fix:` corrección de error
- `docs:` cambios en documentación
- `style:` formateo, missing semi colons, etc.
- `refactor:` refactoring de código
- `test:` agregar o modificar tests
- `chore:` tareas de mantenimiento

**Ejemplos:**
```bash
feat(auth): implementar login con Supabase
fix(api): corregir validación de email
docs(readme): actualizar instrucciones de instalación
style(frontend): aplicar formato con prettier
refactor(backend): mejorar estructura de servicios
test(companies): agregar tests unitarios
chore(deps): actualizar dependencias
```

4. **Push y crear Pull Request**
```bash
git push origin feature/nueva-funcionalidad
```

5. **Crear Pull Request en GitHub**
- Título descriptivo
- Descripción detallada de los cambios
- Asignar reviewers
- Etiquetar con labels apropiados

6. **Revisión por pares**
- Al menos un reviewer debe aprobar
- Resolver comentarios y conflictos
- Mantener el historial limpio

7. **Merge a develop**
- Usar "Squash and merge" para mantener historial limpio
- Eliminar rama feature después del merge

8. **Deploy desde main**
- Hacer merge de develop a main para deploy a producción
- Crear tag de versión si es necesario

### Reglas de Desarrollo

#### Backend (NestJS)
- Seguir principios SOLID
- Usar DTOs para validación
- Escribir tests unitarios
- Documentar APIs con Swagger
- Usar TypeScript estricto

#### Frontend (Next.js)
- Usar componentes funcionales con hooks
- Aplicar Atomic Design
- Validar formularios con Zod
- Usar TypeScript estricto
- Seguir guías de accesibilidad

#### Base de Datos
- Todas las migraciones deben ser reversibles
- Usar nombres descriptivos en inglés
- Agregar índices para consultas frecuentes
- Documentar cambios de esquema

### Estructura de Branches

```
main
├── develop
│   ├── feature/auth-jwt
│   ├── feature/companies-crud
│   ├── feature/jobs-management
│   └── fix/login-validation
└── hotfix/security-patch
```

### Pre-commit Checklist

Antes de hacer commit, verificar:
- [ ] Código compilar sin errores
- [ ] Tests pasan exitosamente
- [ ] Linting sin warnings
- [ ] Documentación actualizada
- [ ] Variables de entorno documentadas
- [ ] No hay credenciales en el código

### Code Review Guidelines

#### Para Reviewers:
- Revisar lógica y arquitectura
- Verificar seguridad
- Comprobar performance
- Validar tests
- Revisar documentación

#### Para Authors:
- Auto-revisar antes de solicitar review
- Proveer contexto en la descripción
- Responder a comentarios constructivamente
- Resolver todos los conflicts

### Comandos Útiles

```bash
# Actualizar develop
git checkout develop
git pull origin develop

# Crear nueva feature
git checkout -b feature/nombre-descriptivo

# Revisar status
git status
git log --oneline

# Rebase interactivo (limpiar commits)
git rebase -i HEAD~3

# Actualizar feature con cambios de develop
git checkout feature/mi-feature
git rebase develop

# Ver diferencias
git diff
git diff develop..feature/mi-feature
```

### Integración Continua

- Los PRs deben pasar todos los checks automatizados
- Tests unitarios deben ejecutarse en cada push
- Linting y formateo son obligatorios
- Build debe ser exitoso

### Versionado

Usar **Semantic Versioning** (semver):
- `MAJOR.MINOR.PATCH`
- `1.0.0` → primera versión estable
- `1.1.0` → nueva funcionalidad (backward compatible)
- `1.1.1` → bug fix
- `2.0.0` → breaking changes

### Issues y Project Management

- Usar GitHub Issues para tracking
- Labels: `bug`, `enhancement`, `documentation`, `help wanted`
- Milestones para releases
- Projects para organizar sprints