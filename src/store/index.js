import { createStore } from 'vuex';
import { findById, upsert, makeAppendItemToResource } from '@/helpers';
import sourceData from '@/data.json';

export const store = createStore({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  },
  getters: {
    authUser: (state) => findById(state.users, state.authId),
  },
  actions: {
    createPost({ commit, state }, post) {
      post.id = `--${Math.random()}`;
      post.userId = state.authId;
      commit('setPost', { post });
      commit('appendPostToThread', {
        childId: post.id,
        parentId: post.threadId,
      });
    },
    async createThread({ commit, state, dispatch }, { text, title, forumId }) {
      const id = `--${Math.random()}`;
      const userId = state.authId;
      const publishedAt = Math.floor(Date.now() / 1000);

      const newThread = {
        id,
        title,
        text,
        forumId,
        publishedAt,
        userId,
        posts: [],
      };

      // Create thread, append its id to the user and forum it belongs to
      commit('setThread', { thread: newThread });
      commit('appendThreadToForum', { childId: id, parentId: forumId });
      commit('appendThreadToUser', { childId: id, parentId: userId });

      // Create post after creating the thread
      dispatch('createPost', { text, threadId: id, publishedAt });

      return newThread;
    },
    async updateThread({ commit, state }, { threadId, title, text }) {
      const thread = findById(state.threads, threadId);
      const post = findById(state.posts, thread.posts[0]);

      const updatedThread = { ...thread, title };
      const updatedPost = { ...post, text };

      commit('setThread', { thread: updatedThread });
      commit('setPost', { post: updatedPost });
      return updatedThread;
    },
    updateUser({ commit }, user) {
      commit('setUser', { user });
    },
  },
  mutations: {
    setPost(state, { post }) {
      upsert(state.posts, post);
    },
    setThread(state, { thread }) {
      upsert(state.threads, thread);
    },
    setUser(state, { user }) {
      const matchIdx = state.users.findIndex((u) => u.id === user.id);

      if (matchIdx >= 0) {
        state.users[matchIdx] = { ...user };
      }
    },
    appendPostToThread: makeAppendItemToResource({
      child: 'posts',
      parent: 'threads',
    }),
    appendThreadToForum: makeAppendItemToResource({
      child: 'threads',
      parent: 'forums',
    }),
    appendThreadToUser: makeAppendItemToResource({
      child: 'threads',
      parent: 'users',
    }),
  },
});
