<template>
  <h1>Welcome To The Forum</h1>
  <CategoryList :categories="categories" />
</template>

<script>
import sourceData from '@/data.json'
import CategoryList from '@/components/CategoryList.vue'

export default {
  name: 'PageHome',
  components: {
    CategoryList
  },
  data () {
    return {
      categories: sourceData.categories
    }
  }
}
</script>

<style></style>
