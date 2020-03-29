import Vue from 'vue'
import Vuex from 'vuex'
import firebaseSocketPlugin from "../sockets/firebaseSocketPlugin";
const fb = require('@/firebaseConfig.js')

Vue.use(Vuex)

const firebaseStore = firebaseSocketPlugin(fb)

export const store = new Vuex.Store({
    state: {
        provinces: [],
        currentUser: null,
        provincesStat: {},
        collaborators: [],
        token: null
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
        },
        setCollaborators(state, val) {
            state.collaborators = val
        },
        setToken(state, val) {
            state.token = val
        }
    },

    actions: {
        clearData({ commit }) {
            commit('setProvinces', [])
            commit('setCurrentUser', null)
            commit('setProvincesStat', {})
            commit('setCollaborators', [])
            commit('setToken', null)
        }
    },

    plugins: [firebaseStore]

})
