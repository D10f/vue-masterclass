import { createStore } from 'vuex'
import sourceData from '@/data.json'

export default createStore({
  state: {
    ...sourceData,
    authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
  },
  getters: {
    authUser: state => {
      const user = state.users.find(u => u.id === state.authId)

      if (!user) return null

      return {
        ...user,
        posts: state.posts.filter(p => p.userId === user.id),
        threads: state.threads.filter(t => t.userId === user.id),
        get postCount () {
          return this.posts.length
        },
        get threadCount () {
          return this.threads.length
        }
      }
    }
  },
  actions: {
    createPost ({ commit, state }, post) {
      const postId = `-${Math.random()}`

      post.id = postId
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      commit('addPost', { post })
      commit('addPostToThread', { postId, threadId: post.threadId })
    },

    async createThread ({ commit, state, dispatch }, { text, title, forumId }) {
      const id = `-${Math.random()}`

      const thread = {
        id,
        forumId,
        title,
        publishedAt: Math.floor(Date.now() / 1000),
        userId: state.authId
      }

      commit('addThread', { thread })
      commit('addThreadToForum', { threadId: id, forumId })
      commit('addThreadToUser', { userId: state.authId, threadId: id })
      dispatch('createPost', { text, threadId: id })

      return state.threads.find(t => t.id === id)
    },

    updateUser (context, user) {
      context.commit('setUser', { user })
    }
  },
  mutations: {
    addPost (state, payload) {
      state.posts.push(payload.post)
    },

    addThread (state, payload) {
      state.threads.push(payload.thread)
    },

    setUser (state, payload) {
      state.users = state.users.map(user => (
        user.id === payload.user.id
          ? { ...payload.user }
          : user
      ))
    },

    addPostToThread (state, { postId, threadId }) {
      const thread = state.threads.find(t => t.id === threadId)
      thread.posts = thread.posts ? [...thread.posts, postId] : [postId]
    },

    addThreadToForum (state, { threadId, forumId }) {
      const forum = state.forums.find(f => f.id === forumId)
      forum.threads = forum.threads ? [...forum.threads, threadId] : [threadId]
    },

    addThreadToUser (state, { userId, threadId }) {
      const user = state.users.find(u => u.id === userId)
      user.threads = user.threads ? [...user.threads, threadId] : [threadId]
    }
  }
})
