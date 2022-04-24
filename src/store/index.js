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
      post.userId = state.authUser.id
      post.publishedAt = Math.floor(Date.now() / 1000)

      commit('addPost', { post })
      commit('addPostToThread', { postId, threadId: post.threadId })
    },

    updateUser (context, user) {
      context.commit('setUser', { user })
    }
  },
  mutations: {
    addPost (state, payload) {
      state.posts.push(payload.post)
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
      thread.posts.push(postId)
    }
  }
})
