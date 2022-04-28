import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import ThreadShow from '@/pages/ThreadShow.vue';
import ForumShow from '@/pages/ForumShow.vue';
import CategoryShow from '@/pages/CategoryShow.vue';
import NotFound from '@/pages/NotFound.vue';

import sourceData from '@/data.json';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/thread/:threadId',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
    beforeEnter(to) {
      const threadExists = sourceData.threads.find(
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
    path: '/forum/:forumId',
    name: 'ForumShow',
    component: ForumShow,
    props: true,
  },
  {
    path: '/category/:categoryId',
    name: 'CategoryShow',
    component: CategoryShow,
    props: true,
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
