import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex); 

export default new Vuex.Store({
  state: {
    count: 0,
    user: null,
    forfait: null
  },


  getters: {
    getCount: (state) => state.count,
    getUser: (state) => state.user,
    getForfait: (state) => state.forfait
  },

  
  mutations: {
    increment(state) {
      state.count++;
    },
    setUser(state, user) {
      state.user = user;
    },
    setForfait(state, forfait){
      state.forfait = forfait;
    }
  },

  actions: {
    // async login({ commit }, { email, password }) {
    //   // Exemple : appel à ton API de connexion
    //   console.log("Connexion en cours...");
    //   // Simule un utilisateur connecté
    //   const fakeUser = { id: 1, nom: "Iliass", email };
    //   commit("setUser", fakeUser);
    // },
    // logout({ commit }) {
    //   commit("setUser", null);
    // }
  }
});
