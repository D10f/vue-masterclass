<template>
  <ul class="thread-list">
    <h2 class="list-title">Threads</h2>
    <ThreadListItem
      v-for="thread in threads"
      :key="thread.id"
      :thread="thread"
    />
  </ul>
</template>

<script>
import ThreadListItem from './ThreadListItem.vue';

export default {
  name: 'ThreadList',
  props: {
    threads: {
      type: Array,
      required: true,
    },
  },
  components: {
    ThreadListItem,
  },
};
</script>
