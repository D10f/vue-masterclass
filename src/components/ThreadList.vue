<template>
  <ul>
    <li class="col-large push-top" v-for="thread in threads" :key="thread.id">
      <h1>{{ thread.title }}</h1>
      <div class="post-list">
        <div class="post" v-for="postId in thread.posts" :key="postId">
          <div class="user-info">
            <a class="user-name" href="#">{{
              getUserById(getPostById(postId).userId).name
            }}</a>
            <a href="#">
              <img
                class="avatar-large"
                :src="getUserById(getPostById(postId).userId).avatar"
                alt="Avatar picture of the author of this post"
              />
            </a>
            <p class="desktop-only text-small">107 posts</p>
          </div>

          <div class="post-content">
            <div>
              <p>{{ getPostById(postId).text }}</p>
            </div>
          </div>

          <div class="post-date text-faded">
            {{ getPostById(postId).publishedAt }}
          </div>
        </div>
        <!-- End of post item -->
      </div>
      <!-- End of post list -->
    </li>
    <!-- End of thread item -->
  </ul>
  <!-- End of thread list -->
</template>

<script>
import sourceData from '@/data.json';

export default {
  name: 'ThreadList',
  props: {
    threads: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      posts: sourceData.posts,
      users: sourceData.users,
    };
  },
  methods: {
    getPostById(postId) {
      return this.posts.find((p) => p.id === postId);
    },
    getUserById(userId) {
      return this.users.find((u) => u.id === userId);
    },
  },
};
</script>
