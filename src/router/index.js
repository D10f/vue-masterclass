import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/components/PageHome.vue'
import PageThreadShow from '@/components/PageThreadShow.vue'
import PageNotFound from '@/components/PageNotFound.vue'

import sourceData from '@/data.json'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PageHome
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: PageThreadShow,
    props: true,
    beforeEnter (to, _from, next) {
      const match = sourceData.threads.find((t) => t.id === to.params.id)
      if (match) {
        return next()
      }
      next({
        name: 'NotFound',
        params: { pathMatch: to.path.substr(1, '/').split('/') },
        query: to.query,
        hash: to.hash
      })
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: PageNotFound
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
