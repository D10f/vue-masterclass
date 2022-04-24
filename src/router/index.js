import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import ThreadShow from '@/pages/ThreadShow.vue'
import Forum from '@/pages/Forum.vue'
import Category from '@/pages/Category.vue'
import NotFound from '@/pages/NotFound.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
    beforeEnter (to, _from, next) {
      const match = store.state.threads.find((t) => t.id === to.params.id)
      if (match) {
        return next()
      }
      next({
        name: 'NotFound',
        params: { pathMatch: to.path.replace('/', '').split('/') },
        query: to.query,
        hash: to.hash
      })
    }
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: Forum,
    props: true
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
