<template>
  <div class="p-4 mb-4 overflow-hidden bg-blueish">
    <div class="flex items-start">
      <div class="flex-shrink-0" v-if="false">
        <CheckCircleIcon
          v-if="level === 'success'"
          class="h-6 w-6 text-green-400"
          aria-hidden="true"
        />
        <ExclamationCircleIcon
          v-else
          class="h-6 w-6 text-red-400"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3 w-0 flex-1 pt-0.5">
        <p class="text-sm font-medium" style="color: #b296cd">
          {{ level === "success" ? "Success!" : "Error!" }}
        </p>
        <p class="mt-1 text-sm text-gray-300">
          {{ message }}
        </p>
      </div>
      <div class="ml-4 flex-shrink-0 flex" v-if="false">
        <button
          @click="deleteItem"
          class="inline-flex text-gray-300 hover:text-gray-500 focus:outline-none"
        >
          <span class="sr-only">Close</span>
          <XIcon class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/vue/outline";
import { XIcon } from "@heroicons/vue/solid";

export default {
  name: "CryptoNotification",

  components: {
    XIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
  },

  props: {
    message: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      default: "success", // can be 'success', 'error'
    },
  },

  created() {
    setTimeout(() => {
      this.deleteItem();
    }, 15000);
  },

  methods: {
    deleteItem() {
      this.$el.classList.add("hidden");
    },
  },
};
</script>
