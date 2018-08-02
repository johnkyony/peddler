import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import NewEvent from '@/components/NewEvent'
import ShowEvent from '@/components/ShowEvent'
import PrintNewTicket from '@/components/PrintNewTicket'
import Settings from '@/components/Settings'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },{
      path: '/event/new',
      name: 'NewEvent',
      component: NewEvent,
      meta:{
        requiresAuth: true
      }

    },
    {
      path: '/event/:id/show',
      name: 'ShowEvent',
      component: ShowEvent,
      props: true,
      meta: {
        requiresAuth: true
      }

    },
    {
      path: '/event/:id/print/:ticketId',
      name: 'PrintNewTicket',
      component: PrintNewTicket,
      props: true,
      meta: {
        requiresAuth: true
      }

    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta:{
        requiresAuth: true
      }
    }
  ]
})

// authentication check , routing to different sections depending on role
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

