<template>
  <div class="post">
    <div class="user-info">
      <a class="user-name" href="#">{{ getUserById(post.userId).name }}</a>
      <a href="#">
        <img
          class="avatar-large"
          :src="getUserById(post.userId).avatar"
          alt="Avatar picture of the author of this post"
        />
      </a>
      <p class="desktop-only text-small">107 posts</p>
    </div>

    <div class="post-content">
      <div>
        <p>{{ post.text }}</p>
      </div>
    </div>

    <div class="post-date text-faded">
      <AppDate :timestamp="post.publishedAt" />
    </div>
  </div>
</template>

<script>
import sourceData from '@/data.json';

export default {
  name: 'PostListItem',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      users: sourceData.users,
    };
  },
  methods: {
    getUserById(userId) {
      return this.users.find((u) => u.id === userId);
    },
  },
};
</script>
