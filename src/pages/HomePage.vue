<template>
  <div class="col-full push-top">
    <h1>Welcome to the Forum</h1>
    <CategoryList :categories="categories" />
  </div>
</template>

<script>
import CategoryList from '@/components/CategoryList.vue';

export default {
  name: 'HomePage',
  components: {
    CategoryList,
  },
  data() {
    return {
      categories: this.$store.state.categories,
    };
  },
};
</script>

<style></style>
