import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/issue/:id',
      name: 'issue',
      component: () => import('../views/Issue.vue'),
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('../views/AddIssue.vue'),
    },
  ],
})

export default router
