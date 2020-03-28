import Vue from 'vue';
import Router from 'vue-router';
import UpdateCollaborator from '@/components/UpdateCollaborator'
import Dashboard from '@/components/Dashboard'
import BadGateway from '@/components/BadGateway'
import Login from '@/components/Login'
import firebase from 'firebase'

Vue.use(Router);

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      props: { page: 1 },
      alias: '/',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Collaborators',
      name: 'Collaborators',
      component: UpdateCollaborator,
      props: { page: 4 },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: { page: 2 },
    },
    {
      path: '/404',
      name: 'BadGateway',
      props: { page: 3 },
      component: BadGateway
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router
