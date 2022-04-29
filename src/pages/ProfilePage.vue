<template>
  <div class="flex-grid">
    <div class="col-3 push-top">
      <UserProfileCard v-if="!edit" :user="user" />
      <UserProfileCardEditor v-else :user="user" />
    </div>

    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">{{ user.name }}'s recent activity </span>
        <a href="#">See only started threads?</a>
      </div>

      <hr />

      <PostList :posts="userPosts" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PostList from '@/components/PostList.vue';
import UserProfileCard from '@/components/UserProfileCard.vue';
import UserProfileCardEditor from '@/components/UserProfileCardEditor.vue';

export default {
  name: 'ProfilePage',
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  components: { PostList, UserProfileCard, UserProfileCardEditor },
  computed: {
    ...mapGetters({ user: 'authUser' }),
    userPosts() {
      return this.$store.state.posts.filter((p) => p.userId === this.user.id);
    },
  },
};
</script>
