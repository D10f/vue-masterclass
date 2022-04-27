<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <p>
        By <a href="#" class="link-unstyled">{{ thread.author.name }}</a>, <AppDate :timestamp="thread.publishedAt" />.
        <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">
          {{ thread.contributors }} replies by {{ thread.replies }} contributors
        </span>
    </p>

    <!-- Info about author of thread omitted for now -->

    <PostList :posts="threadPosts" />

    <PostEditor @save="addPost" />

  </div>
</template>

<script>
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
  computed: {
    posts () {
      return this.$store.state.posts
    },
    thread () {
      // return this.threads.find(t => t.id === this.id)
      return this.$store.getters.thread(this.id)
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

      this.$store.dispatch('createPost', post)
    }
  }
}
</script>

<style>

</style>
