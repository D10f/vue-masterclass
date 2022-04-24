<template>
  <div class="col-full">
    <form @submit.prevent="save">

      <div class="form-group">
        <textarea class="form-input" v-model="text" />
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
  props: {
    threadId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      text: ''
    }
  },
  methods: {
    save () {
      const postId = `-${Math.random()}`
      const post = {
        publishedAt: Math.floor(Date.now() / 1000), // time in ms
        text: this.text,
        userId: 'ALXhxjwgY9PinwNGHpfai6OWyDu2',
        id: postId
      }

      this.$emit('save', { post })
      this.text = ''

      return null
    }
  }
}
</script>

<style>

</style>
