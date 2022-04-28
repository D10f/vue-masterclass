<template>
  <ForumList
    v-for="category in categories"
    :key="category.id"
    :forums="getForumsForCategoryId(category.id)"
    :category="category"
  />
</template>

<script>
import ForumList from '@/components/ForumList.vue';
import sourceData from '@/data.json';
export default {
  name: 'CategoryList',
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  components: { ForumList },
  methods: {
    getForumsForCategoryId(id) {
      return sourceData.forums.filter((f) => f.categoryId === id);
    },
  },
};
</script>
