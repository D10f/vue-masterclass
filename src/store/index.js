import { createStore } from 'vuex';
import { findById } from '@/helpers';
import sourceData from '@/data.json';

export const store = createStore({
  state: {
    ...sourceData,
    // authId: 'FsCDAk9w8NeXEceLV87arpsXjnQ2',
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  },
  getters: {
    // authUser: (state) => state.users.find((u) => u.id === state.authId),
    authUser: (state) => findById(state.users, state.authId),
  },
  actions: {
    createPost({ commit, state }, post) {
      post.id = `--${Math.random()}`;
      post.userId = state.authId;
      commit('setPost', { post });
      commit('appendPostToThread', {
        postId: post.id,
        threadId: post.threadId,
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
      commit('appendThreadToForum', { threadId: id, forumId });
      commit('appendThreadToUser', { threadId: id, userId });

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
      const matchIdx = state.posts.findIndex((p) => p.id === post.id);
      if (matchIdx >= 0) {
        state.posts[matchIdx] = post;
      } else {
        state.posts.push(post);
      }
    },
    setThread(state, { thread }) {
      const matchIdx = state.threads.findIndex((t) => t.id === thread.id);
      if (matchIdx >= 0) {
        state.threads[matchIdx] = thread;
      } else {
        state.threads.push(thread);
      }
    },
    setUser(state, { user }) {
      let userIdx = state.users.findIndex((u) => u.id === user.id);

      if (userIdx >= 0) {
        state.users[userIdx] = { ...user };
      }
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = findById(state.threads, threadId);
      thread.posts = thread.posts || [];
      thread.posts.push(postId);
    },
    appendThreadToForum(state, { threadId, forumId }) {
      const forum = findById(state.forums, forumId);
      forum.threads = forum.threads || [];
      forum.threads.push(threadId);
    },
    appendThreadToUser(state, { threadId, userId }) {
      const user = findById(state.users, userId);
      user.threads = user.threads || [];
      user.threads.push(threadId);
    },
  },
});
