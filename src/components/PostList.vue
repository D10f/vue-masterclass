<template>
  <div class="post-list">
    <PostListItem v-for="post in posts" :key="post.id" :post="post" />
    <PostEditor @add-post="addPost" />
  </div>
</template>

<script>
import PostListItem from '@/components/PostListItem.vue';
import PostEditor from '@/components/PostEditor.vue';

export default {
  name: 'PostList',
  components: {
    PostListItem,
    PostEditor,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addPost(text) {
      this.$emit('add-post', text);
    },
  },
};
</script>
