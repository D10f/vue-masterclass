<template>
  <div class="col-large push-top">
    <h1>Welcome to the Forum</h1>
    <ThreadList :threads="threads" />
  </div>
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
