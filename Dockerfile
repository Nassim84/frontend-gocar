# Utilise l'image officielle Node.js avec une version compatible avec Vite
FROM node:20

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

# Installe les dépendances
RUN npm install

# Copie les sources de l'application
COPY . .

# Construit l'application pour la production
RUN npm run build

# Expose le port 5173 pour accéder à l'application
EXPOSE 5173

# Commande pour démarrer l'application en mode preview
CMD ["npm", "run", "dev"]
