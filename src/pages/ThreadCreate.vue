<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum.name }}</i>
    </h1>
    <ThreadEditor @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor.vue';

export default {
  name: 'ThreadCreate',
  props: {
    forumId: {
      type: String,
      required: true,
    },
  },
  components: { ThreadEditor },
  computed: {
    forum() {
      return this.$store.state.forums.find((f) => f.id === this.forumId);
    },
  },
  methods: {
    async save(title, text) {
      const newThread = await this.$store.dispatch('createThread', {
        forumId: this.forumId,
        title,
        text,
      });

      this.$router.push({
        name: 'ThreadShow',
        params: { threadId: newThread.id },
      });
    },
    cancel() {
      this.$router.push({
        name: 'ForumShow',
        params: { forumId: this.forumId },
      });
    },
  },
};
</script>
