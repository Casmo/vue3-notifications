<template>
    <transition enter-active-class="transition duration-300 ease-out transform" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="show" class="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
            <div class="p-4">
                <div class="flex items-center">
                    <div class="flex justify-between flex-1 w-0">
                        <p class="flex-1 w-0 text-sm font-medium text-gray-900">
                            {{ notification.message }}
                        </p>
                        <button v-if="notification.action" @click="handleAction" type="button" class="flex-shrink-0 ml-3 text-sm font-medium text-indigo-600 bg-white rounded-md hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {{ notification.action.label }}
                        </button>
                    </div>
                    <div class="flex flex-shrink-0 ml-4">
                        <button @click="closeNotification" class="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span class="sr-only">Close</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

export default {
  props: {
      duration: {
        type: Number,
        default: 7500,
    },
    notification: {
        type: Object,
        required: true,
    }
  },
  data() {
      return {
          show: true,
          timer: null,
      }
  },
  mounted() {
    let duration = this.duration;
    if (this.notification.duration != null) {
        duration = this.notification.duration;
    }
    this.timer = setTimeout(() => {
        this.closeNotification();
    }, duration);
  },
  methods: {
    handleAction() {
      this.$emit('handleAction');
    },
    closeNotification() {
        this.show = false;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.$emit('closed');
    }
  }
}
</script>