import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false


axios.defaults.baseURL = 'http://localhost:3000/'

new Vue({
  vuetify: new Vuetify({}),
  render: h => h(App),
  router: router,
}).$mount('#app')
