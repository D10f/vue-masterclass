<template>
  <form @submit.prevent="save">
    <div class="profile-card">
      <p class="text-center">
        <img
          :src="user.avatar"
          :alt="`${user.name}'s avatar`"
          class="avatar-xlarge img-update"
        />
      </p>

      <div class="form-group">
        <input
          v-model="editingUser.username"
          @keydown.enter.prevent=""
          type="text"
          placeholder="Username"
          class="form-input text-lead text-bold"
        />
      </div>

      <div class="form-group">
        <input
          v-model="editingUser.name"
          @keydown.enter.prevent=""
          type="text"
          placeholder="Full Name"
          class="form-input text-lead"
        />
      </div>

      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea
          v-model="editingUser.bio"
          class="form-input"
          id="user_bio"
          placeholder="Write a few words about yourself."
        ></textarea>
      </div>

      <div class="stats">
        <span>{{ userPostCount }} posts</span>
        <span>{{ userThreadCount }} threads</span>
      </div>

      <hr />

      <div class="form-group">
        <label class="form-label" for="user_website">Website</label>
        <input
          v-model="editingUser.website"
          @keydown.enter.prevent=""
          autocomplete="off"
          class="form-input"
          id="user_website"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_email">Email</label>
        <input
          v-model="editingUser.email"
          @keydown.enter.prevent=""
          autocomplete="off"
          class="form-input"
          id="user_email"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_location">Location</label>
        <input
          v-model="editingUser.location"
          @keydown.enter.prevent=""
          autocomplete="off"
          class="form-input"
          id="user_location"
        />
      </div>

      <div class="btn-group space-between">
        <button @click.prevent="cancel" type="reset" class="btn-ghost">
          Cancel
        </button>
        <button type="submit" class="btn-blue">Save</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'UserProfileCardEditor',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editingUser: { ...this.user },
    };
  },
  computed: {
    userPosts() {
      return this.$store.state.posts.filter((p) => p.userId === this.user.id);
    },
    userThreads() {
      return this.$store.state.threads.filter((t) => t.userId === this.user.id);
    },
    userPostCount() {
      return this.userPosts.length || 0;
    },
    userThreadCount() {
      return this.userThreads.length || 0;
    },
  },
  methods: {
    save() {
      this.$store.dispatch('updateUser', this.editingUser);
      this.$router.push({ name: 'ProfilePage' });
    },
    cancel() {
      this.$router.push({ name: 'ProfilePage' });
    },
  },
};
</script>
