import { createStore } from 'vuex'
import sourceData from '@/data.json'

export default createStore({
  state: {
    ...sourceData,
    authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
  },
  getters: {
    authUser: state => state.users.find(u => u.id === state.authId)
  },
  actions: {
    createPost (context, post) {
      const postId = `-${Math.random()}`

      context.commit('addPost', { post })
      context.commit('addPostToThread', { postId, threadId: post.threadId })
    }
  },
  mutations: {
    addPost (state, payload) {
      state.posts.push(payload.post)
    },

    addPostToThread (state, { postId, threadId }) {
      const thread = state.threads.find(t => t.id === threadId)
      thread.posts.push(postId)
    }
  }
})
