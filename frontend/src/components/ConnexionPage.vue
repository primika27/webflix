<template>
  <div class="login-container">
    <div class="login-card">
      <img src="../assets/webflix.png" alt="WebFlix" class="logo" />

      <h1 class="title">Connexion à WebFlix</h1>

      <div class="form-group">
        <label for="email">Adresse courriel</label>
        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="ex: utilisateur@email.com"
        />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="Entrez votre mot de passe"
        />
      </div>

      <button
        class="login-btn"
        @click="tryConnexion"
        :disabled="!isFormValid"
      >
        Se connecter
      </button>

      <p v-if="displayConnexionMessage" class="error-message">
        ⚠️ Courriel ou mot de passe incorrect
      </p>
    </div>
  </div>
</template>

<script>
import { signIn } from "../services/connexionService";
import { getClientForfait } from "../services/clientService";

export default {
    data(){
        return {
            email: '',
            password: '',
            displayConnexionMessage: false
        }
    },
    computed: {
        isFormValid() {
            return this.email.trim() !== '' && this.password.trim() !== '';
        }
    },
    methods: {
        tryConnexion(){
            signIn({email: this.email, password: this.password}).then((response) => {
                if(response.success){
                    const idClient = response.utilisateur.id;
                    this.getForfait(idClient);
                    // stock les infos du candidat dans le store
                    this.$store.commit("setUser", response.utilisateur);
                    // rediriger vers une autre page
                    this.$router.push('/userHomePage');
                }else{
                    this.displayConnexionMessage = true;
                }
            })
            .catch((error) => {
                console.error("Erreur : ",error);
            });
        },
        getForfait(idClient){
            getClientForfait(idClient).then((response) => {
                console.log("response ", response);
                if(response.success){
                    // stocker les info du forfait de l'user connecter
                    this.$store.commit("setForfait", response.forfaitInfo);
                }
            }).catch((error) => {
                console.error("Erreur : ",error);
            });
        }
    },
    
    
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #f8fafc 0%, #eef1f4 100%);
  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #333;
}

.login-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 2.5rem 3rem;
  width: 400px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  text-align: center;
  animation: fadeIn 0.5s ease;
}

.logo {
  width: 110px;
  margin-bottom: 1rem;
}

.title {
  color: #2b7a78;
  margin-bottom: 2rem;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.form-group {
  text-align: left;
  margin-bottom: 1.2rem;
}

label {
  display: block;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.4rem;
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background: #f9fafb;
  color: #333;
  font-size: 0.95rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus {
  border-color: #3eb489;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.2);
  outline: none;
}

.login-btn {
  width: 100%;
  background: linear-gradient(90deg, #42b983, #2fa172);
  color: white;
  border: none;
  padding: 0.9rem;
  font-size: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  font-weight: 500;
}

.login-btn:hover:not(:disabled) {
  background: linear-gradient(90deg, #4fd29b, #36a476);
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(66, 185, 131, 0.2);
}

.login-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-message {
  color: #e63946;
  margin-top: 1rem;
  font-size: 1.3rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

