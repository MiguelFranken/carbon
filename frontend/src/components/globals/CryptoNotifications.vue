<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div
    aria-live="assertive"
    class="z-50 fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
  >
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <TransitionGroup
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        tag="div"
        class="max-w-sm w-full"
      >
        <CryptoNotification
          v-for="(message, index) in messagesContainer"
          :key="message.message.length + index"
          :message="message.message"
          :level="message.level"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import CryptoNotification from "@/components/globals/CryptoNotification.vue";

export default {
  components: {
    CryptoNotification,
  },

  setup() {
    const show = ref(true);

    return {
      show,
    };
  },

  data() {
    return {
      messagesContainer: this.messages,
    };
  },

  props: {
    messages: {
      type: Array,
      default: () => [],
    },
  },

  created() {
    this.$bus.on("notification", (payload) =>
      this.messagesContainer.push(payload)
    );
  },
};
</script>
