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
        collaborators: []
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
        }
        
    },

    actions: {},

    plugins: [firebaseStore]

})
