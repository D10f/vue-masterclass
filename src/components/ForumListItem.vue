<template>
  <div class="forum-listing">
    <div class="forum-details">
      <router-link
        :to="{ name: 'ForumShow', params: { forumId: forum.id } }"
        class="text-xlarge"
      >
        {{ forum.name }}
      </router-link>
      <p>{{ forum.description }}</p>
    </div>

    <div class="threads-count">
      <p>
        <span class="count">{{ forum.threads?.length || '0' }}</span>
        {{ forum.threads?.length === 1 ? 'thread' : 'threads' }}
      </p>
    </div>

    <div class="last-thread"></div>
  </div>
</template>

<script>
import sourceData from '@/data.json';

export default {
  name: 'ForumListItem',
  props: {
    forum: {
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
    forumAuthor() {
      return this.users.find((u) => u.id === this.forum.userId);
    },
  },
};
</script>
