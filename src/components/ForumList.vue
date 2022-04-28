<template>
  <div class="forum-list">
    <h2 class="list-title">
      <router-link
        :to="{ name: 'CategoryShow', params: { categoryId: category.id } }"
        >{{ category.name }}</router-link
      >
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
};
</script>
