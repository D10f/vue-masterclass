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
      // return this.$store.state.forums.filter((f) => f.categoryId === id);
      return this.$store.dispatch.getForumsForCategoryId(id);
    },
  },
};
</script>
