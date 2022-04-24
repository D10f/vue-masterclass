<template>
  <div class="post">
    <div class="user-info">
      <a href="#" class="user-name">{{
        userById(post.userId).name
      }}</a>
      <a href="">
        <img
          class="avatar-large"
          :src="userById(post.userId).avatar"
          alt=""
        />
      </a>
      <p class="desktop-only text-small">107 posts</p>
    </div>

    <div class="post-content">
      <div>
        <p>{{post.text }}</p>
      </div>
    </div>

    <AppDate :timestamp="post.publishedAt" />

    <!-- REACTIONS GO HERE -->
  </div>
</template>

<script>

export default {
  name: 'PostListItem',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    users () {
      return this.$store.state.users
    }
  },
  methods: {
    userById (userId) {
      return this.users.find((u) => u.id === userId)
    }
  }
}
</script>

<style>

</style>
