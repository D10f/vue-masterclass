<template>
<div class="col-full">

  <div class="forum-listing" v-for="forum in forums" :key="forum.id">
    <div class="forum-details">
      <router-link
        :to="{ name: 'Forum', params: { id: forum.id } }"
        class="text-xlarge"
      >
        {{ forum.name }}
      </router-link>
      <p>{{ forum.description }}</p>
    </div>

    <div class="threads-count">
      <p>
        <span class="count">{{ forum.threads?.length || 0 }}</span>
        {{ forumThreadsWording(forum.threads) }}
      </p>
    </div>

    <div class="last-thread"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ForumList',
  props: {
    forums: {
      type: Array,
      required: true
    }
  },
  methods: {
    forumThreadsWording (threads) {
      return threads && threads.length === 1 ? 'thread' : 'threads'
    }
  }
}
</script>

<style></style>
