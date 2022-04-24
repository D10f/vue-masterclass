<template>
  <h1>{{ currentCategory.name }}</h1>
  <CategoryList :categories="[currentCategory]"/>
</template>

<script>
import sourceData from '@/data.json'
import CategoryList from '@/components/CategoryList.vue'

export default {
  components: { CategoryList },
  name: 'CategoryPage',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    currentCategory () {
      return sourceData.categories.find(c => c.id === this.id)
    },
    categoryForums () {
      return sourceData.forums.filter(f => f.categoryId === this.id)
    }
  }
}
</script>

<style>

</style>
