import { createStore } from 'vuex'
import { findById, upsert } from '@/helpers'
import sourceData from '@/data.json'

const makeAppendChildToParentMutation = ({ parent, child }) => {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId)
    resource[child] = resource[child] || []
    resource[child].push(childId)
  }
}

export default createStore({
  state: {
    ...sourceData,
    authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
  },
  getters: {
    authUser: state => {
      const user = findById(state.users, state.authId)

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

      commit('setPost', { post })
      commit('addPostToThread', { childId: postId, parentId: post.threadId })
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

      commit('setThread', { thread })
      commit('addThreadToForum', { childId: id, parentId: forumId })
      commit('addThreadToUser', { childId: id, parentId: state.authId })
      dispatch('createPost', { text, threadId: id })

      return findById(state.threads, id)
    },

    updateUser (context, user) {
      context.commit('setUser', { user })
    }
  },
  mutations: {
    setPost (state, { post }) {
      upsert(state.posts, post)
      // state.posts.push(payload.post)
    },

    setThread (state, { thread }) {
      upsert(state.threads, thread)
      // state.threads.push(payload.thread)
    },

    setUser (state, payload) {
      state.users = state.users.map(user => (
        user.id === payload.user.id
          ? { ...payload.user }
          : user
      ))
    },

    addPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),

    addThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),

    addThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' })

    // addPostToThread (state, { postId, threadId }) {
    //   const thread = findById(state.threads, threadId)
    //   thread.posts = thread.posts ? [...thread.posts, postId] : [postId]
    // },

    // addThreadToForum (state, { threadId, forumId }) {
    //   const forum = findById(state.forums, forumId)
    //   forum.threads = forum.threads ? [...forum.threads, threadId] : [threadId]
    // },

    // addThreadToUser (state, { userId, threadId }) {
    //   const user = findById(state.users, userId)
    //   user.threads = user.threads ? [...user.threads, threadId] : [threadId]
    // }
  }
})
