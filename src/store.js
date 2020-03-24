import Vue from 'vue'
import Vuex from 'vuex'
import provincePath from './services/provincePath.js'
const fb = require('@/firebaseConfig.js')

Vue.use(Vuex)


fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)
    provincePath.getFromFisebase(provinces => store.commit('setProvinces', provinces) )
    fb.provincesStat.on('value', snapshot => store.commit('setProvincesStat', snapshot.val() || {}))

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
