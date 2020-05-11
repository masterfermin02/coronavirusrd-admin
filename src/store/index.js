import Vue from 'vue'
import Vuex from 'vuex'
import getters from '../vuex/blog/getters'
import mutations from '../vuex/blog/mutations'
import firebaseSocketPlugin from "../sockets/firebaseSocketPlugin";
const fb = require('@/firebaseConfig.js');

Vue.use(Vuex);

const firebaseStore = firebaseSocketPlugin(fb);
const defaultProvince = 'DO-1';

const state = {
    key: '',
    title: '',
    content: '',
    date: null,
    writer: '',
    imgUrl: '',
    provinces: [],
    currentUser: null,
    provincesStat: {},
    collaborators: [],
    token: null,
    selectProvince: defaultProvince
};

export const store = new Vuex.Store({
    state,
    mutations: {
        ...mutations,
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
        },
        setSelectProvince(state, val) {
            state.selectProvince = val;
        }
    },
    getters,

    actions: {
        clearData({ commit }) {
            commit('setProvinces', [])
            commit('setCurrentUser', null)
            commit('setProvincesStat', {})
            commit('setCollaborators', [])
            commit('setToken', null)
        },
        setSelectProvince({commit, state}, newValue) {
            commit('setSelectProvince', newValue)
            return state.selectProvince
        }
    },

    plugins: [firebaseStore]

})
