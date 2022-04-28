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
      <p class="replies-count">{{ thread.posts.length }} Replies</p>
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
import sourceData from '@/data.json';

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
      users: sourceData.users,
    };
  },
  computed: {
    threadAuthor() {
      return this.users.find((u) => u.id === this.thread.userId);
    },
  },
};
</script>
