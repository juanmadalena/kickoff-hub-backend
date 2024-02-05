# Usa una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /usr

# Copia los archivos de configuración y dependencias
COPY package*.json ./
COPY tsconfig.json ./

COPY .env .env

# Instala las dependencias
RUN npm install

# Copia el código fuente de la aplicación
COPY . .

# Compila TypeScript a JavaScript
RUN npm run tsc

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 8020

# Comando para ejecutar la aplicación cuando el contenedor se inicia
CMD ["npm", "start"]
