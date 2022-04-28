import { createStore } from 'vuex';
import sourceData from '@/data.json';

export const store = createStore({
  state: {
    ...sourceData,
    authId: 'FsCDAk9w8NeXEceLV87arpsXjnQ2',
  },
  getters: {
    authUser: (state) => state.users.find((u) => u.id === state.authId),
  },
  actions: {
    createPost(context, post) {
      post.id = `--${Math.random()}`;
      context.commit('setPost', { post });
      context.commit('appendPostToThread', {
        postId: post.id,
        threadId: post.threadId,
      });
    },
  },
  mutations: {
    setPost(state, { post }) {
      state.posts.push(post);
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads.find((t) => t.id === threadId);
      thread.posts.push(postId);
    },
  },
});