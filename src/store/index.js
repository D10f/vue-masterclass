import { createStore } from 'vuex';
import sourceData from '@/data.json';

export const store = createStore({
  state: {
    ...sourceData,
    // authId: 'FsCDAk9w8NeXEceLV87arpsXjnQ2',
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
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
    updateUser(context, user) {
      context.commit('setUser', { user });
    },
  },
  mutations: {
    setPost(state, { post }) {
      state.posts.push(post);
    },
    setUser(state, { user }) {
      let userIdx = state.users.findIndex((u) => u.id === user.id);

      if (userIdx >= 0) {
        state.users[userIdx] = { ...user };
      }
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads.find((t) => t.id === threadId);
      thread.posts.push(postId);
    },
  },
});
