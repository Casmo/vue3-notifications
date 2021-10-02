<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div aria-live="assertive" class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6">
    <div class="flex flex-col items-center w-full space-y-4 sm:items-end">
      <Notification v-for="(notification, index) in notifications" :key="index" :notification="notification" @handleAction="handleAction(notification)" />
    </div>
  </div>
</template>

<script>
import { XIcon } from '@heroicons/vue/solid'
import Notification from './Notification.vue'

export default {
  components: {
    XIcon,
    Notification
  },
  props: {},
  data() {
    return {
      notifications: [],
    }
  },
  methods: {
    handleAction(notification) {
      notification.action.action();
    },
    open(notification) {
      this.notifications.push(notification)
    },
  }
}
</script>