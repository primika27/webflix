<template>
  <div class="personne-details" v-if="personne">
    <div class="header">
      <img v-if="personne.photoURL" :src="personne.photoURL" :alt="'Photo de ' + personne.prenom + ' ' + personne.nom" class="photo">
      <h1>{{ personne.prenom }} {{ personne.nom }}</h1>
    </div>
    <div class="info">
      <p v-if="personne.dateNaissance"><strong>Date de naissance:</strong> {{ formatDate(personne.dateNaissance) }}</p>
      <p v-if="personne.lieuNaissance"><strong>Lieu de naissance:</strong> {{ personne.lieuNaissance }}</p>
    </div>
    <div class="bio" v-if="personne.biographie">
      <h2>Biographie</h2>
      <p>{{ personne.biographie }}</p>
    </div>
    <div class="filmography" v-if="personne.participations && personne.participations.length">
      <h2>Filmographie</h2>
      <ul>
        <li v-for="participation in personne.participations" :key="participation.idParticipation">
          <router-link :to="'/film/' + participation.film.id">
            {{ participation.film.titre }}
          </router-link>
          <span class="role"> ({{ participation.role }})</span>
        </li>
      </ul>
    </div>
  </div>
  <div v-else-if="isLoading" class="loading-message">
    Chargement des informations...
  </div>
  <div v-else class="error-message">
    Impossible de charger les informations de cette personne.
  </div>
</template>

<script>
import { getPersonneById } from '../services/personneService';

export default {
  name: 'PersonneDetailsPage',
  data() {
    return {
      personne: null,
      isLoading: true,
    };
  },
  methods: {
    async fetchPersonneDetails() {
      this.isLoading = true;
      try {
        const personneId = this.$route.params.id;
        this.personne = await getPersonneById(personneId);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la personne :", error);
        this.personne = null;
      } finally {
        this.isLoading = false;
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    }
  },
  created() {
    this.fetchPersonneDetails();
  },
  watch: {
    '$route.params.id': 'fetchPersonneDetails'
  }
}
</script>

<style scoped>
.personne-details {
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
.header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}
.photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 2rem;
  border: 3px solid #eee;
}
h1 {
  font-size: 2.5rem;
  font-weight: 300;
}
.info, .bio, .filmography {
  margin-bottom: 2rem;
}
h2 {
  font-size: 1.8rem;
  font-weight: 400;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}
p {
  line-height: 1.6;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 0.5rem 0;
  font-size: 1.1rem;
}
.role {
  color: #777;
  font-style: italic;
}
.loading-message, .error-message {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}
</style>
