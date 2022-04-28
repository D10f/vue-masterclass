<template>
  <div class="forum-list">
    <h2 class="list-title">
      <router-link
        v-if="!isSamePage"
        :to="{ name: 'CategoryShow', params: { categoryId: category.id } }"
        >{{ category.name }}</router-link
      >
      <span v-else>{{ category.name }}</span>
    </h2>

    <ForumListItem v-for="forum in forums" :key="forum.id" :forum="forum" />
  </div>
</template>

<script>
import ForumListItem from '@/components/ForumListItem.vue';

export default {
  name: 'ForumList',
  components: {
    ForumListItem,
  },
  props: {
    forums: {
      type: Array,
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isSamePage() {
      return this.$route.params.categoryId === this.category.id;
    },
  },
};
</script>
