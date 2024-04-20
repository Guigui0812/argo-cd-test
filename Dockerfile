# Utiliser l'image officielle de Node.js comme image de base
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des sources de l'application
COPY . .

# Exposer le port sur lequel votre app sera accessible
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
