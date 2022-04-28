<template>
  <div class="col-full push-top">
    <h1>{{ currentCategory.name }}</h1>
    <ForumList :forums="categoryForums" :category="currentCategory" />
  </div>
</template>

<script>
import ForumList from '@/components/ForumList.vue';
import sourceData from '@/data.json';

export default {
  name: 'CategoryShow',
  props: {
    categoryId: {
      type: String,
      required: true,
    },
  },
  components: { ForumList },
  computed: {
    currentCategory() {
      return sourceData.categories.find((c) => c.id === this.categoryId);
    },
    categoryForums() {
      return sourceData.forums.filter((f) => f.categoryId === this.categoryId);
    },
  },
};
</script>
