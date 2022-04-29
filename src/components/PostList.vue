<template>
  <div class="post-list">
    <PostListItem v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import PostListItem from '@/components/PostListItem.vue';

export default {
  name: 'PostList',
  components: {
    PostListItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  updated() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  },
};
</script>
