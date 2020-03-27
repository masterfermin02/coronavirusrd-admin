import Vue from 'vue'
import Vuex from 'vuex'
import provinceServices from './services/provinceServices'
const fb = require('@/firebaseConfig.js')

Vue.use(Vuex)


fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)
    provinceServices.getProvinces().then(provinces => store.commit('setProvinces', provinces) )
    provinceServices.getProvincesStat().then( provincesStat => store.commit('setProvincesStat', provincesStat))
  }
})

export const store = new Vuex.Store({
  state: {
    provinces: [],
    currentUser: null,
    provincesStat: {}
  },

  mutations: {
    setProvinces(state, val) {
      state.provinces = val
    },
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setProvincesStat(state, val) {
      state.provincesStat = val
    }
  },

  actions: {
  }

})
