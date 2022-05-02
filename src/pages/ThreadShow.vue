<template>
  <div class="col-large push-top">
    <header>
      <h1>{{ thread.title }}</h1>
    </header>
    <p>
      By <a href="#" class="link-unstyled">{{ thread.author.name }}</a
      >, <AppDate :timestamp="thread.publishedAt" />.
      <span
        style="float: right; margin-top: 2px"
        class="hide-mobile text-faded text-small"
        >{{ thread.replies }} replies by
        {{ thread.contributorsCount }} contributors</span
      >
    </p>
    <PostList :posts="threadPosts" />
    <PostEditor @add-post="addPost" />
  </div>
</template>

<script>
import PostList from '@/components/PostList.vue';
import PostEditor from '@/components/PostEditor.vue';
import AppDate from '@/components/AppDate.vue';

export default {
  name: 'ThreadShow',
  props: {
    threadId: {
      type: String,
      required: true,
    },
  },
  components: {
    PostList,
    PostEditor,
    AppDate,
  },
  computed: {
    thread() {
      // return this.$store.state.threads.find((t) => t.id === this.threadId);
      const thread = this.$store.getters.thread(this.threadId);
      console.log(thread);
      return thread;
    },
    threadPosts() {
      return this.$store.state.posts.filter(
        (p) => p.threadId === this.threadId
      );
    },
  },
  methods: {
    addPost(text) {
      const newPost = {
        text,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.threadId,
      };
      this.$store.dispatch('createPost', newPost);
    },
  },
};
</script>
