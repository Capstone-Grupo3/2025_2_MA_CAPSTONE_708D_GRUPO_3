# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Generar cliente Prisma
RUN npx prisma generate

# Construir aplicación
RUN npm run build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copiar archivos necesarios desde builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "run", "start:prod"]
