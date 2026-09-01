<template>
  <div v-if="visible" class="dialog-backdrop">
    <div class="dialog">
      <h3>Louer le film "{{filmToRent.titre}}"</h3>
      <h4>Information : </h4>
      <p>Copie(s) disponible(s) : {{nbCopiesRestante}}</p>
      <div> 
        <h4>Vos information (forfait) : </h4>
        <p>Votre forfait : {{forfaitDescription}}</p>
        <p>Nombre de location restante : {{locationRestante}}</p>
        <p>Date de retour : {{dueDate}}</p>
      </div>
      <p v-if="showRentFilmMessage">Souhaitez-vous confirmer la location de ce film ?</p>
      <p v-if="noCopyLeft" class="message-pre">Aucune copie de ce film n'est disponible pour le moment.</p>
      <p v-if="cannotRentNoMore" class="message-pre">Vous avez atteint le nombre maximal de locations.</p>
      <div class="actions">
        <button @click="handleRent" :disabled="blockLocation">Confirmer</button>
        <button @click="$emit('close')">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
import { rentFilm, getClientLocation } from '../services/clientService'
import { getAvailableCopies } from '../services/filmService'

export default {
  name: 'RentFilmDialog',
  props: {
    visible: Boolean,
    filmToRent: Object
  },
  data() {
    return {
      nbCopiesRestante : 0,
      nbLocationRestante: 0,
      locations: [],
    }
  },
  watch: {
    filmToRent(newFilm){
      if(newFilm && newFilm.id){
        this.getCopiesRestante();
        this.getLocationRestante();
      }
    }
  },
  computed:{
    forfaitDescription(){
      return this.$store.getters.getForfait.nom;
    },
    locationLeft(){
      return this.$store.getters.getForfait.locationsMax;
    },
    dueDate(){
      const todayDate = new Date();
      const code = this.$store.getters.getForfait.code;
      switch (code) {
        case 'D':
          todayDate.setDate(todayDate.getDate() + 10);
          break;
        case 'I':
          todayDate.setMonth(todayDate.getMonth() + 1);
          break;
        case 'A':
          return "illimité";
        default:
          break;
      }
      return todayDate.toISOString().split('T')[0];
    },
    locationRestante(){
      return this.locationLeft - this.locations.length
    },
    blockLocation(){
      return this.locationRestante == 0 || this.nbCopiesRestante == 0;
    },
    noCopyLeft(){
      return this.nbCopiesRestante == 0
    },
    showRentFilmMessage(){
      return this.nbCopiesRestante > 1 && this.locationRestante > 1
    },
    cannotRentNoMore(){
      return this.locationRestante == 0;
    }
  },
  methods: {
    handleRent(){
      const payload = { idClient: this.$store.getters.getUser.id, idFilm: this.filmToRent.id}
      rentFilm(payload).then((response) => {
        if(response.success){
          this.$emit('close');
        }
      }).catch((error) => { 
        console.error("Erreur : ",error);
      });
    },
    getCopiesRestante(){
      getAvailableCopies(this.filmToRent.id).then((response) => {
        if (response.success){
          this.nbCopiesRestante = response.data;
        }
      })
    },
    getLocationRestante(){
      getClientLocation(this.$store.getters.getUser.id).then((response) => {
        if(response.success){
          this.locations = response.location;
        }
      })
    }
  },
}
</script>

<style scoped>
.dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  width: 350px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}

.actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

button {
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 5px;
  border: none;
}

button:first-child {
  background: #3f51b5;
  color: white;
}

button:last-child {
  background: #ccc;
}
button:disabled {
  background: #aaa;
  cursor: not-allowed;
  opacity: 0.6;
}

.message-pre{
  color: red;
}
</style>
