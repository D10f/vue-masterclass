<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <!-- Info about author of thread omitted for now -->

    <PostList :posts="threadPosts" />

    <PostEditor @save="addPost" />

  </div>
</template>

<script>
import sourceData from '@/data.json'
import PostList from '@/components/PostList.vue'
import PostEditor from '@/components/PostEditor.vue'

export default {
  name: 'ThreadShow',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    PostList,
    PostEditor
  },
  data () {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      newPostText: ''
    }
  },
  computed: {
    thread () {
      return this.threads.find(t => t.id === this.id)
    },
    threadPosts () {
      return this.posts.filter(p => p.threadId === this.id)
    }
  },
  methods: {
    addPost (eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id
      }

      this.posts.push(post)
      this.threads.posts.push(post.id)
    }
  }
}
</script>

<style>

</style>
