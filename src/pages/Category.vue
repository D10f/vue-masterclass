<template>
  <h1>{{ currentCategory.name }}</h1>
  <CategoryList :categories="[currentCategory]"/>
</template>

<script>
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
      return this.$store.state.categories.find(c => c.id === this.id)
    }
  }
}
</script>

<style>

</style>
