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

    <div class="post-data text-faded" :title="parseDate(post.publishedAt)">
      {{ parseDate(post.publishedAt, { isRelative: true }) }}
    </div>
    <!-- REACTIONS GO HERE -->
  </div>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import sourceData from '@/data.json'

dayjs.extend(relativeTime)

export default {
  name: 'PostListItem',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      users: sourceData.users
    }
  },
  methods: {
    userById (userId) {
      return this.users.find((u) => u.id === userId)
    },
    parseDate (timestamp, { isRelative } = {}) {
      const date = dayjs.unix(timestamp)
      return isRelative ? date.fromNow() : date
    }
  }
}
</script>

<style>

</style>
