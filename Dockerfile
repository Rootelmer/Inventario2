# 1. Imagen base con Node.js
FROM node:20-alpine

# 2. Crear directorio de la app
WORKDIR /app

# 3. Copiar package.json y package-lock.json
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install

# 5. Copiar todo el proyecto
COPY . .

# 6. Compilar TypeScript a JavaScript
RUN npx tsc

# 7. Puerto que expondrá la app
EXPOSE 3001

# 8. Comando para iniciar la app
CMD ["node", "dist/index.js"]
