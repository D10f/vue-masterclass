import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gkantgxspryqkwznznjm.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrYW50Z3hzcHJ5cWt3em56bmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTEzMTc0MjYsImV4cCI6MTk2Njg5MzQyNn0.RIsN7sU6DIIOFc4WeeivcWNjNlD0S8QTvamFQPcrKBQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// const fs = require('fs');
// const { promisify } = require('util');
// const { pipeline } = require('stream');
// const { resolve } = require('path');
// const { createClient } = require('@supabase/supabase-js');

// const readFile = promisify(fs.readFile);

// // const filepath = resolve(__dirname, '../data.json');
// const filepath = resolve(__dirname, 'test.json');

// const SUPABASE_URL = 'https://gkantgxspryqkwznznjm.supabase.co';
// const SUPABASE_KEY =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrYW50Z3hzcHJ5cWt3em56bmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTEzMTc0MjYsImV4cCI6MTk2Njg5MzQyNn0.RIsN7sU6DIIOFc4WeeivcWNjNlD0S8QTvamFQPcrKBQ';

// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// supabase
//   .from('posts')
//   .select('id, text')
//   .then(async ({ data }) => {
//     const idmap = {};

//     const file = await readFile(filepath, 'utf-8');

//     const { posts } = JSON.parse(file);

//     for (let i = 0, l = posts.length; i < l; i++) {
//       const match = posts.find((p) => p.text === data[i].text);
//       if (match) {
//         idmap[posts[i].id] = data[i].id;
//       }
//     }

//     pipeline(
//       fs.createReadStream(filepath),
//       ...Object.entries(idmap).map(
//         ([key, value]) =>
//           async function* (readable) {
//             for await (const chunk of readable) {
//               yield chunk.toString().replaceAll(key, value);
//             }
//           }
//       ),
//       fs.createWriteStream(resolve(__dirname, 'test.json')),
//       (err) => console.log(err ? err.message : '')
//     );
//   })
//   .catch(console.error);

// readFile(filepath, 'utf-8').then((f) => {
//   const { categories } = JSON.parse(f);
//   categories.forEach((t) => {
//     supabase
//       .from('categories')
//       .update({ forums: t.forums })
//       .match({ id: t.id })
//       .then(console.log)
//       .catch(console.error);
//   });
// });
