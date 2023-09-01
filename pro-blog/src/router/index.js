import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RouterConstants from '../constants/RouterConstants'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: RouterConstants.HOME_VIEW_NAME,
    component: HomeView,
    meta: {
      title: RouterConstants.HOME_VIEW_NAME
    }
  },
  {
    path: `/${RouterConstants.BLOG_VIEW_NAME.toLowerCase()}`,
    name: RouterConstants.BLOG_VIEW_NAME,
    component: () => import('../views/BlogView.vue'),
    meta: {
      title: RouterConstants.BLOG_VIEW_NAME
    }
  },
  {
    path: `/${RouterConstants.LOGIN_VIEW_NAME.toLowerCase()}`,
    name: RouterConstants.LOGIN_VIEW_NAME,
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: RouterConstants.LOGIN_VIEW_NAME
    }
  },
  {
    path: 'forgot-password',
    name: RouterConstants.FORGOT_PASSWORD_VIEW_NAME,
    component: () => import('../views/ForgotPasswordView.vue'),
    meta: {
      title: RouterConstants.FORGOT_PASSWORD_VIEW_NAME
    }
  },
  {
    path: `/${RouterConstants.REGISTER_VIEW_NAME.toLowerCase()}`,
    name: RouterConstants.REGISTER_VIEW_NAME,
    component: () => import('../views/RegisterView.vue'),
    meta: {
      title: RouterConstants.REGISTER_VIEW_NAME
    }
  },
  {
    path: `/${RouterConstants.PROFILE_VIEW_NAME.toLowerCase()}`,
    name: RouterConstants.PROFILE_VIEW_NAME,
    component: () => import('../views/ProfileView.vue'),
    meta: {
      title: RouterConstants.PROFILE_VIEW_NAME
    }
  },
  {
    path: `/${RouterConstants.ADMIN_VIEW_NAME.toLowerCase()}`,
    name: RouterConstants.ADMIN_VIEW_NAME,
    component: () => import('../views/AdminView.vue'),
    meta: {
      title: RouterConstants.ADMIN_VIEW_NAME
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | ProBlogs`
  next()
})

export default router
