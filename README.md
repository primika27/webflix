# WebFlix

## Objectif de l'application

Cette application est une plateforme web orientée autour de la recherche et de la location de films. Le code montre un systéme oé un utilisateur peut :

- se connecter avec un courriel et un mot de passe ;
- consulter un catalogue de films ;
- filtrer les films selon plusieurs critéres ;
- afficher les détails d'un film (résumé, durée, année, genres, pays, acteurs, réalisateurs, bande d'annonce) ;
- louer un film si le client est reconnu et si la régle de forfait le permet ;
- consulter des informations liées au client, à son forfait et à ses locations.

Le projet est composé d'un backend en Node.js/TypeScript et d'un frontend en Vue.js.

## Architecture du projet

### Backend

Le backend est dans le dossier `backend-node`.

Il utilise :

- Express pour exposer les API REST ;
- TypeORM pour accéder à une base Oracle ;
- des routes dédiées à la connexion, aux films, aux personnes, aux clients et aux locations.

Les routes principales visibles dans le code sont :

- `/connexion` : authentification d'un utilisateur ;
- `/films` : recherche et liste des films, ainsi que le nombre de copies disponibles ;
- `/personnes` : accés aux informations liées aux personnes (réalisateurs, acteurs) ;
- `/client` : informations sur le forfait et les locations du client ;
- `/location` : création d'une location de film.

### Frontend

Le frontend est dans le dossier `frontend`.

Il utilise :

- Vue.js ;
- Vue Router pour la navigation ;
- un écran de connexion ;
- une page d'accueil avec recherche de films ;
- un affichage détaillé des films et un dialogue de location.

## Fonctionnement observé dans le code

### 1. Authentification

La page de connexion demande une adresse courriel et un mot de passe. Elle envoie ces données au backend via l'API `/connexion`.

Si les informations correspondent à un utilisateur existant, l'application stocke l'utilisateur et le redirige vers la page d'accueil.

### 2. Consultation des films

La page d'accueil permet de filtrer les films par :

- titre ;
- année minimale ;
- année maximale ;
- réalisateur ;
- genre ;
- pays ;
- langue originale ;
- acteur.

La recherche appelle l'API des films et affiche les résultats avec les détails du film.

### 3. Détails du film

Pour chaque film, l'interface affiche :

- titre et année ;
- affiche ;
- durée ;
- résumé ;
- scénariste ;
- genres ;
- pays de production ;
- acteurs et réalisateurs ;
- bande d'annonce.

### 4. Location de film

La page d'accueil contient un bouton de location pour un film sélectionné. Le backend vérifie ensuite :

- l'existence du client ;
- la limite de locations selon le forfait ;
- la disponibilité d'une copie du film ;
- puis enregistre la location et passe la copie en état louée.

## Technologie de données

Le backend configure une connexion Oracle via `AppDataSource` dans `backend-node/src/data-source.ts`.

Les entités visibles dans le code concernent notamment :

- `Film` ;
- `Personne` ;
- `Genre` ;
- `Pays` ;
- `BandeAnnonce` ;
- `Client` ;
- `Forfait` ;
- `CopieFilm` ;
- `Location` ;
- `Utilisateur`.

## Démarrage

### Backend

Dans le dossier `backend-node` :

```bash
npm install
npm start
```

Le script `start` est défini dans `package.json` et lance le serveur TypeScript avec `ts-node`.

### Frontend

Dans le dossier `frontend` :

```bash
npm install
npm run serve
```

## Conclusion

Le projet correspond é une application de consultation et de location de films, avec une logique d'authentification, une recherche multi-critéres, une consultation détaillée des films et la gestion d'une location selon le forfait du client.
