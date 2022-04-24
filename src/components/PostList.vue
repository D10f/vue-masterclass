<template>
  <div class="post-list">
    <PostListItem :post="post" v-for="post in posts" :key="post.id" />
  </div>
</template>

<script>
import PostListItem from '@/components/PostListItem.vue'

export default {
  name: 'PostList',
  props: {
    posts: {
      required: true,
      type: Array
    }
  },
  components: {
    PostListItem
  }
}
</script>

<style>

</style>
