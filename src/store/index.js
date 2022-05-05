import { createStore } from 'vuex';
import { findById, upsert, makeAppendItemToResource } from '@/helpers';
import { supabase } from '@/config/supabase';

export const store = createStore({
  state: {
    categories: [],
    forums: [],
    threads: [],
    posts: [],
    users: [],
    authId: '6605d9bc-7650-4202-9ec1-0db1f267733e',
  },
  getters: {
    authUser: (state) => findById(state.users, state.authId),
    thread: (state) => (id) => {
      const thread = findById(state.threads, id);
      return {
        ...thread,
        get author() {
          return findById(state.users, thread.userId);
        },
        get replies() {
          return thread.posts.length - 1; // subtract first post
        },
        get contributorsCount() {
          return thread.contributors.length;
        },
      };
    },
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

      commit('appendContributorToThread', {
        childId: state.authId,
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
    getForumsForCategoryId({ commit, state }, id) {
      const category = findById(state.categories, id);
      return dispatch('');
    },
    fetchPost({ dispatch }, id) {
      return dispatch('fetchItem', { resource: 'posts', id });
    },
    fetchThread({ dispatch }, id) {
      return dispatch('fetchItem', { resource: 'threads', id });
    },
    fetchForum({ dispatch }, id) {
      return dispatch('fetchItem', { resource: 'forums', id });
    },
    async fetchItem({ commit }, { resource, id }) {
      const { data, error } = await supabase
        .from(resource)
        .select()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      commit('setState', { resource, data });
      return data;
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
      upsert(state.users, user);
      // const matchIdx = state.users.findIndex((u) => u.id === user.id);

      // if (matchIdx >= 0) {
      //   state.users[matchIdx] = { ...user };
      // }
    },
    setState(state, { resource, data }) {
      upsert(state[resource], data);
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
    appendContributorToThread: makeAppendItemToResource({
      child: 'contributors',
      parent: 'threads',
    }),
  },
});
