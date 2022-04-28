<template>
  <div class="col-full">
    <form @submit.prevent="addPost">
      <div class="form-group">
        <textarea v-model="newPostText" class="form-input"></textarea>
      </div>

      <div class="form-actions">
        <button class="btn-blue">Submit Post</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PostEditor',
  data() {
    return {
      newPostText: '',
    };
  },
  methods: {
    addPost() {
      this.$emit('add-post', this.newPostText);
      this.newPostText = '';
    },
  },
};
</script>
