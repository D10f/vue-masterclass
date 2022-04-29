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
    createPost({ commit, state }, post) {
      post.id = `--${Math.random()}`;
      post.userId = state.authId;
      commit('setPost', { post });
      commit('appendPostToThread', {
        postId: post.id,
        threadId: post.threadId,
      });
    },
    createThread({ commit, state, dispatch }, { text, title, forumId }) {
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
      dispatch('createPost', { text, threadId: id, publishedAt, userId });
    },
    updateUser({ commit }, user) {
      commit('setUser', { user });
    },
  },
  mutations: {
    setPost(state, { post }) {
      state.posts.push(post);
    },
    setThread(state, { thread }) {
      state.threads.push(thread);
    },
    setUser(state, { user }) {
      let userIdx = state.users.findIndex((u) => u.id === user.id);

      if (userIdx >= 0) {
        state.users[userIdx] = { ...user };
      }
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads.find((t) => t.id === threadId);
      thread.posts = thread.posts || []; // THIS IS UNNECESSARY!!
      thread.posts.push(postId);
    },
    appendThreadToForum(state, { threadId, forumId }) {
      const forum = state.forums.find((f) => f.id === forumId);
      forum.threads = forum.threads || []; // THIS IS UNNECESSARY!!
      forum.threads.push(threadId);
    },
    appendThreadToUser(state, { threadId, userId }) {
      const user = state.users.find((u) => u.id === userId);
      user.threads = user.threads || []; // THIS IS UNNECESSARY!!
      user.threads.push(threadId);
    },
  },
});
