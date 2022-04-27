<template>
  <ThreadList :threads="threads" />
</template>

<script>
import ThreadList from '@/components/ThreadList.vue';
import sourceData from '@/data.json';

export default {
  name: 'HomePage',
  components: {
    ThreadList,
  },
  data() {
    return {
      threads: sourceData.threads,
    };
  },
};
</script>

<style></style>
