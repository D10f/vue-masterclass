<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <!-- Info about author of thread omitted for now -->

    <PostList :posts="threadPosts" />

  </div>
</template>

<script>
import sourceData from '@/data.json'
import PostList from '@/components/PostList.vue'

export default {
  name: 'ThreadShow',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    PostList
  },
  data () {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts
    }
  },
  computed: {
    thread () {
      return this.threads.find(t => t.id === this.id)
    },
    threadPosts () {
      return this.posts.filter(p => p.threadId === this.id)
    }
  }
}
</script>

<style>

</style>
