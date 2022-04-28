<template>
  <div class="col-large push-top">
    <header>
      <h1>{{ currentThread.title }}</h1>
      <router-link :to="{ name: 'HomePage' }">Back</router-link>
    </header>
    <PostList :posts="threadPosts" />
    <PostEditor @add-post="addPost" />
  </div>
</template>

<script>
import PostList from '@/components/PostList.vue';
import PostEditor from '@/components/PostEditor.vue';
import sourceData from '@/data.json';

export default {
  name: 'ThreadShow',
  props: {
    threadId: {
      type: String,
      required: true,
    },
  },
  components: {
    PostList,
    PostEditor,
  },
  data() {
    return {
      posts: sourceData.posts,
      threads: sourceData.threads,
    };
  },
  computed: {
    currentThread() {
      return this.threads.find((t) => t.id === this.threadId);
    },
    threadPosts() {
      return this.posts.filter((p) => p.threadId === this.threadId);
    },
  },
  methods: {
    addPost(text) {
      const newPostId = `--${Math.random()}`;
      const newPost = {
        id: newPostId,
        text,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.threadId,
        userId: 'u4r8XCziZEWEXsj2UIKNHBoDh0n2',
      };
      this.posts.push(newPost);
      this.currentThread.posts.push(newPostId);
    },
  },
};
</script>
