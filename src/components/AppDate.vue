<template>
  <div :title="date">
    {{ relativeDate }}
  </div>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default {
  name: 'AppDate',
  props: {
    timestamp: {
      type: Number,
      required: true
    }
  },
  computed: {
    date () {
      return dayjs.unix(this.timestamp)
    },
    relativeDate () {
      return this.date.fromNow()
    }
  }
}
</script>

<style>

</style>
