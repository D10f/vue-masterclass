<template>
  <div class="col-large push-top">
    <h1>Browse all the forums</h1>
    <ForumList :categories="categories" />
  </div>
</template>

<script>
import sourceData from '@/data.json';

export default {
  name: 'ForumShow',
  data() {
    return {
      categories: sourceData.categories,
    };
  },
};
</script>
