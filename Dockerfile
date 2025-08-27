# Usa la imagen oficial de Node.js LTS
FROM node:18-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el proyecto
COPY . .

# Expone el puerto que tu app usará (Render asigna un puerto mediante ENV)
EXPOSE 3001

# Compila TypeScript (si usas TS)
RUN npm run build

# Comando para iniciar la app
CMD ["npm", "start"]
