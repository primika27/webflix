<template>
  <div class="user-home">
    <img alt="Vue logo" src="../assets/webflix.png" class="logo">
    <h1 style="color:lightskyblue;">Bienvenue à WebFlix</h1>
    <div class="filters">
      
      <div style>
        <input type="text" v-model="filters.titre" placeholder="Titre du film">
        <input type="number" v-model="filters.anneeMin" placeholder="Année min">
        <input type="text" v-model="filters.anneeMax" placeholder="Année max">
        <input type="text" v-model="filters.realisateur" placeholder="Réalisateur">
      </div>
      <div>
        <input type="text" v-model="filters.genre" placeholder="Genre">
        <input type="text" v-model="filters.pays" placeholder="Pays">
        <input type="text" v-model="filters.langueOriginale" placeholder="Langue originale">
        <input type="text" v-model="filters.acteur" placeholder="Acteur">

      </div>
      <button @click="searchFilms">Rechercher</button>
    </div>
    <div class="film-list">
        <div v-if="isLoading" class="loading-message">Loading films...</div>
        <div v-else-if="films.length === 0" class="no-results-message">
            Aucun film ne correspond à vos critères de recherche.
        </div>
        <ul v-else>
            <li v-for="(film, index) in films" :key="film.id ? film.id : index">
                <h3>{{ film.titre }} ({{ film.anneeSortie }})</h3>
                <button @click="toggleDetails(film)">Details</button>
                <div v-if="film.showDetails">
                    <img v-if="film.afficheURL" :src="film.afficheURL" alt="Affiche du film" style="max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 1rem;">
                    <p><strong>Durée:</strong> {{ film.dureeMinutes }} minutes</p>
                    <p><strong>Résumé:</strong> {{ film.resume }}</p>
                    <p><strong>Scénariste:</strong> {{ film.scenariste }}</p>
                    <p><strong>Genres:</strong> {{ film.genres.map(genre => genre.nomGenre).join(', ') }}</p>
                    <p><strong>Pays de production:</strong> {{ film.paysProduction.map(pays => pays.nomPays).join(', ') }}</p>
                    <p><strong>Acteurs:</strong>
                        <span v-if="film.participations && film.participations.length">
                            <div v-for="participation in film.participations.filter(p => p.role === 'ACTEUR')" :key="participation.idParticipation" style="margin: 0.25rem 0;">
                                <router-link v-if="participation.personne" :to="'/personne/' + participation.personne.idPersonne" style="color: #42b983; text-decoration: none;">
                                    {{ participation.personne.prenom }} {{ participation.personne.nom }}
                                </router-link>
                                <span v-if="participation.personnage" style="font-style: italic; color: #666; margin-left: 0.5rem;">
                                    ({{ participation.personnage }})
                                </span>
                            </div>
                        </span>
                        <span v-else>N/A</span>
                    </p>
                    <p><strong>Réalisateurs:</strong>
                        <span v-if="film.participations && film.participations.length">
                            <span v-for="(participation, index) in film.participations.filter(p => p.role === 'REALISATEUR')" :key="participation.idParticipation">
                                <router-link v-if="participation.personne" :to="'/personne/' + participation.personne.idPersonne">
                                    {{ participation.personne.prenom }} {{ participation.personne.nom }}
                                </router-link>
                                <span v-if="index < film.participations.filter(p => p.role === 'REALISATEUR').length - 1">, </span>
                            </span>
                        </span>
                        <span v-else>N/A</span>
                    </p>
                    <p><strong>Bandes d'annonce:</strong>
                        <span v-if="film.bandeAnnonces && film.bandeAnnonces.length">
                            <div v-for="(ba, index) in film.bandeAnnonces" :key="ba.idBa" style="margin: 0.5rem 0;">
                                <a :href="ba.url" target="_blank" style="color: #42b983; text-decoration: none;">
                                    🎬 Bande d'annonce {{ index + 1 }}
                                </a>
                            </div>
                        </span>
                        <span v-else>Aucune bande d'annonce disponible</span>
                    </p>
                    <button class="rentButton" @click="rentHandler(film)">Louer</button>
                </div>
            </li>
        </ul>
    </div>
    <RentFilmDialog :visible="showDialog" :filmToRent="filmToPossiblyRent" @close="closeDialog"></RentFilmDialog>
  </div>
</template>

<script>
import { getFilms } from '../services/filmService';
import RentFilmDialog from './RentFilmDialog.vue';

export default {
  name: 'UserHomePage',
  components: {RentFilmDialog}, 
  data() {
    return {
      films: [],
      isLoading: false,
      showDialog: false,
      filmToPossiblyRent: {},
      filters: {
        titre: '',
        anneeMin: null,
        anneeMax: null,
        genre: '',
        pays: '',
        realisateur: '',
        langueOriginale: '',
        acteur: ''
      }
    };
  },
  methods: {
    async searchFilms() {
      this.isLoading = true;
      try {
        const films = await getFilms(this.filters);
        this.films = films.map(film => ({ ...film, showDetails: false }));
      } catch (error) {
        console.error("Erreur lors de la recherche de films : ", error);
      } finally {
        this.isLoading = false;
      }
    },
    toggleDetails(film) {
      film.showDetails = !film.showDetails;
    },
    rentHandler(film){
      this.filmToPossiblyRent = film;
      this.showDialog = true;
    },
    closeDialog(){
      this.showDialog = false;
      this.filmToPossiblyRent = {};
    }
  },
  mounted() {
    this.searchFilms();
  }
}
</script>

<style scoped>
.user-home {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  padding: 2rem;
  background-color: #f7f8fa;
  color: #333;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  height: 60px;
  width: auto;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-weight: 300;
}

.filters {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
  align-items: center;
}

.filters input, .filters button {
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #333;
  font-size: 1rem;
}

.filters input::placeholder {
  color: #999;
}

.filters button {
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.filters button:hover {
  background-color: #36a476;
}

.film-list ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.film-list li {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.film-list h3 {
  color: #2c3e50;
  margin-top: 0;
  font-size: 1.25rem;
  font-weight: 500;
}

.film-list button {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.film-list button:hover {
  background-color: #e0e0e0;
}

.film-list div p {
  margin-top: 1rem;
  line-height: 1.5;
  font-size: 0.95rem;
}

.loading-message, .no-results-message {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
  padding: 2rem;
}
.rentButton{
  color: #42b983;
}
</style>
