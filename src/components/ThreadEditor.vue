<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input
        v-model="threadTitle"
        type="text"
        id="thread_title"
        class="form-input"
        name="title"
      />
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        v-model="threadText"
        id="thread_content"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
      ></textarea>
    </div>

    <div class="btn-group">
      <button
        @click.prevent="this.$emit('cancel')"
        type="reset"
        class="btn btn-ghost"
      >
        Cancel
      </button>
      <button class="btn btn-blue" type="submit" name="Publish">
        {{ isEditing ? 'Update' : 'Publish' }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ThreadEditor',
  props: {
    title: String,
    text: String,
  },
  data() {
    return {
      isEditing: !!this.title && this.text,
      threadTitle: this.title || '',
      threadText: this.text || '',
    };
  },
  methods: {
    save() {
      this.$emit('save', this.threadTitle, this.threadText);
    },
  },
};
</script>
