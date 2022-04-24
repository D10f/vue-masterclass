<template>
  <div class="col-full">

    <div class="forum-list" v-for="category in categories" :key="category.id">
      <h2 class="list-title">
        <router-link
          :to="{ name: 'Category', params: { id: category.id }}"
        >{{ category.name }}</router-link>
      </h2>

      <ForumList :forums="findForumsByCategoryId(category.id)" />

    </div>
  </div>
</template>

<script>
import ForumList from '@/components/ForumList.vue'
import sourceData from '@/data.json'

export default {
  name: 'CategoryList',
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  components: {
    ForumList
  },
  methods: {
    findForumsByCategoryId (categoryId) {
      return sourceData.forums.filter(f => f.categoryId === categoryId)
    }
  }
}
</script>

<style></style>
