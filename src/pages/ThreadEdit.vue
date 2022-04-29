<template>
  <div class="col-full push-top">
    <h1>
      Editing <i>{{ thread.title }}</i>
    </h1>
    <ThreadEditor
      @save="save"
      @cancel="cancel"
      :title="thread.title"
      :text="firstPost.text"
    />
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor.vue';

export default {
  name: 'ThreadEdit',
  props: {
    threadId: {
      type: String,
      required: true,
    },
  },
  components: { ThreadEditor },
  computed: {
    thread() {
      return this.$store.state.threads.find((t) => t.id === this.threadId);
    },
    firstPost() {
      return this.$store.state.posts.find((p) => p.id === this.thread.posts[0]);
    },
  },
  methods: {
    save(title, text) {
      this.$store.dispatch('updateThread', {
        threadId: this.threadId,
        title,
        text,
      });
      this.$router.push({
        name: 'ThreadShow',
        params: { threadId: this.threadId },
      });
    },
    cancel() {
      this.$router.push({
        name: 'ForumShow',
        params: { forumId: this.thread.forumId },
      });
    },
  },
};
</script>
