import Vue from 'vue';
import Router from 'vue-router';
import UpdateCollaborator from '@/components/UpdateCollaborator'
import Dashboard from '@/components/Dashboard'
import BadGateway from '@/components/BadGateway'
import Miscelaneous from '@/components/Miscelaneous'
import UpdateCaseByDate from '@/components/UpdateCaseByDate'
import Login from '@/components/Login'
import firebase from 'firebase'
import CaseByProvince from "../components/CaseByProvince";
import PostList from "../components/blog/PostList";
import WritePost from "../components/blog/WritePost";

Vue.use(Router);

const router =  new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      props: { page: 2 },
      alias: '/',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/miscelaneous',
      name: 'Miscelaneous',
      component: Miscelaneous,
      props: { page: 6 },
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
      path: '/stats',
      name: 'stats',
      component: UpdateCaseByDate,
      props: { page: 5},
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/provinces',
      name: 'provinces',
      component: CaseByProvince,
      props: { page: 6},
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostList,
      props: { page: 7 },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/posts/create',
      name: 'postCreate',
      component: WritePost,
      props: { page: 7 },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: { page: 1 },
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
