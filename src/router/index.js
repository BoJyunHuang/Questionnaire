import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("../views/HomeView.vue")
    }, {
      path: '/list',
      name: 'list',
      component: () => import("../views/ListView.vue")
    }, {
      path: '/page',
      name: 'page',
      component: () => import("../views/PageView.vue")
    }, {
      path: '/check-page',
      name: 'check-page',
      component: () => import("../views/CheckPageView.vue")
    }, {
      path: '/static',
      name: 'static',
      component: () => import("../views/StaticView.vue")
    },
  ]
})

export default router
