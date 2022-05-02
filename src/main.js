import { createApp } from 'vue';
import { router } from '@/router';
import { store } from '@/store';
import AppDate from '@/components/AppDate.vue';
import App from './App.vue';

createApp(App)
  .use(router)
  .use(store)
  .component('AppDate', AppDate)
  .mount('#app');

// import sourceData from '@/data.json';
// import { supabase } from '@/config/supabase';

// Seed Categories
// supabase
//   .from('categories')
//   .insert(
//     sourceData.categories.map((cat) => ({
//       name: cat.name,
//       slug: cat.slug,
//       forums: [],
//     }))
//   )
//   .then(console.log)
//   .catch(console.error);

// Seed Forums
// supabase
//   .from('forums')
//   .insert(
//     sourceData.forums.map((f) => ({
//       name: f.name,
//       slug: f.slug,
//       description: f.description,
//       categoryId: f.categoryId,
//       threads: [],
//     }))
//   )
//   .then(console.log)
//   .catch(console.error);

// Seed Threads
// supabase
//   .from('threads')
//   .insert(
//     sourceData.threads.map((t) => ({
//       title: t.title,
//       slug: t.slug,
//       userId: t.userId,
//       forumId: t.forumId,
//       contributors: t.contributors,
//       posts: [],
//     }))
//   )
//   .then(console.log)
//   .catch(console.error);

// Seed Posts
// supabase
//   .from('posts')
//   .insert(
//     sourceData.posts.map((t) => ({
//       userId: t.userId,
//       threadId: t.threadId,
//       text: t.text,
//     }))
//   )
//   .then(console.log)
//   .catch(console.error);
