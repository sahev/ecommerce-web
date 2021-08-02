import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue';
import Admin from './components/admin/admin.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})

export default router;
