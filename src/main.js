import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/'
import axios from 'axios'
import VueAxios from 'vue-axios'
const fb = require('@/firebaseConfig.js')

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

// handle load
let app
fb.auth.onAuthStateChanged(() => {
    if(!app) {
      app = new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount('#app')
    }
})
