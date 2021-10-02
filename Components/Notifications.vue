<template>
  <div aria-live="assertive" class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6">
    <div class="flex flex-col items-center w-full space-y-4 sm:items-end">
      <Notification v-for="(notification, index) in notifications" :key="notification.id" :notification="notification" @handleAction="handleAction(notification)" @closed="notificationClosed(notification.id)" />
    </div>
  </div>
</template>

<script>
import Notification from './Notification.vue'

export default {
  components: {
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
      notification.id = new Date();
      this.notifications.push(notification);
    },
    notificationClosed(id) {
      for (let i = 0; i < this.notifications.length; i++) {
        if (this.notifications[i].id === id) {
          this.notifications.splice(i, 1);
          return;
        }
      }
    }
  }
}
</script>