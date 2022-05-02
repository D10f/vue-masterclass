<template>
  <li class="thread">
    <header>
      <p>
        <router-link
          :to="{ name: 'ThreadShow', params: { threadId: thread.id } }"
        >
          {{ thread.title }}
        </router-link>
      </p>

      <p class="text-faded text-xsmall">
        By <a href="#">{{ threadAuthor.name }}</a
        >, <AppDate :timestamp="thread.publishedAt" />.
      </p>
    </header>

    <div class="activity">
      <!-- subtract 1 for original post -->
      <p class="replies-count">{{ thread.posts.length - 1 }} Replies</p>
      <img class="avatar-medium" :src="threadAuthor.avatar" alt="User Avatar" />
      <div>
        <p class="text-xsmall">
          <a href="#">{{ threadAuthor.name }}</a>
        </p>
        <p class="text-xsmall text-faded">
          <AppDate :timestamp="thread.publishedAt" />
        </p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ThreadListItem',
  props: {
    thread: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      users: this.$store.state.users,
    };
  },
  computed: {
    threadAuthor() {
      return this.users.find((u) => u.id === this.thread.userId);
    },
  },
};
</script>
