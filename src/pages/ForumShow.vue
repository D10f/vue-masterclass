<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <router-link
        :to="{ name: 'ThreadCreate', params: { forumId } }"
        class="btn-green btn-small"
        >Start a thread</router-link
      >
    </div>

    <div class="push-top">
      <ThreadList :threads="threads" />
    </div>
  </div>
</template>

<script>
import ThreadList from '@/components/ThreadList.vue';

export default {
  name: 'ForumShow',
  props: {
    forumId: {
      type: String,
      required: true,
    },
  },
  components: { ThreadList },
  computed: {
    forum() {
      return this.$store.state.forums.find((f) => f.id === this.forumId);
    },
    threads() {
      return this.$store.state.threads.filter(
        (t) => t.forumId === this.forumId
      );
    },
  },
};
</script>
