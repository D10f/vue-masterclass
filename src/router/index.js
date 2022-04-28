import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import ThreadShow from '@/pages/ThreadShow.vue';
import ForumShow from '@/pages/ForumShow.vue';
import CategoryShow from '@/pages/CategoryShow.vue';
import NotFound from '@/pages/NotFound.vue';

import { store } from '@/store';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/category/:categoryId',
    name: 'CategoryShow',
    component: CategoryShow,
    props: true,
    beforeEnter(to) {
      const categoryExists = store.state.categories.find(
        (c) => c.id === to.params.categoryId
      );

      if (!categoryExists) {
        return {
          name: 'NotFound',
          params: { pathMatch: to.path.split('/').slice(1) },
          to: to.query,
          hash: to.hash,
        };
      }
    },
  },
  {
    path: '/forum/:forumId',
    name: 'ForumShow',
    component: ForumShow,
    props: true,
    beforeEnter(to) {
      const forumExists = store.state.forums.find(
        (f) => f.id === to.params.forumId
      );

      if (!forumExists) {
        return {
          name: 'NotFound',
          params: { pathMatch: to.path.split('/').slice(1) },
          to: to.query,
          hash: to.hash,
        };
      }
    },
  },
  {
    path: '/thread/:threadId',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
    beforeEnter(to) {
      const threadExists = store.state.threads.find(
        (t) => t.id === to.params.threadId
      );

      if (!threadExists) {
        return {
          name: 'NotFound',
          params: { pathMatch: to.path.split('/').slice(1) },
          to: to.query,
          hash: to.hash,
        };
      }
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
