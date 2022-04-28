<template>
  <time class="post-date text-faded" :title="localizedDate">
    {{ relativeDate }}
  </time>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedDate from 'dayjs/plugin/localizedFormat';
dayjs.extend(relativeTime);
dayjs.extend(localizedDate);

export default {
  name: 'AppDate',
  props: {
    timestamp: {
      type: Number,
      required: true,
    },
  },
  computed: {
    localizedDate() {
      return dayjs.unix(this.timestamp).format('llll');
    },
    relativeDate() {
      return dayjs.unix(this.timestamp).fromNow();
    },
  },
};
</script>
