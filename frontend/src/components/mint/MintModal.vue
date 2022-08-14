<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      static
      class="fixed z-40 inset-0 overflow-y-auto"
      :open="open"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-900 bg-opacity-90 transition-opacity"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          >
            <div>
              <!-- Spinning Icon -->
              <div
                class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
              >
                <RefreshIcon
                  v-if="status !== 'minted'"
                  class="h-6 w-6 text-green-600 animate-spin-slow"
                  aria-hidden="true"
                />
                <CheckIcon
                  v-if="status === 'minted'"
                  class="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>

              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  class="text-2xl leading-6 font-medium text-gray-900"
                >
                  <span v-if="status === 'confirming'"
                    >Confirm Transaction</span
                  >
                  <span v-if="status === 'confirmed'">Minting</span>
                  <span v-if="status === 'minted'">Successfully Minted</span>
                </DialogTitle>
                <div class="mt-2">
                  <p
                    class="text-sm text-gray-500"
                    v-if="status === 'confirming'"
                  >
                    Now please confirm the transaction in your MetaWallet to
                    mint your diamond
                  </p>
                  <p
                    class="text-sm text-gray-500"
                    v-if="status === 'confirmed'"
                  >
                    Your diamond is currently being minted on the Ethereum
                    blockchain. This may take a few seconds or minutes. We will
                    show you a notification as soon as the minting is complete.
                  </p>
                  <p class="text-sm text-gray-500" v-if="status === 'minted'">
                    Your diamond has been successfully minted on the Ethereum
                    blockchain.
                  </p>
                  <button
                    v-if="status !== 'minted'"
                    type="button"
                    class="whitespace-nowrap text-sm font-medium nes-btn pixelated diamond-button w-full mt-6"
                    @click="open = false"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <router-link
                :to="'/diamonds/' + token"
                v-if="status === 'minted'"
              >
                <button
                  type="button"
                  class="whitespace-nowrap text-sm font-medium nes-btn pixelated diamond-button w-full mt-6"
                  @click="open = false"
                >
                  Go to your minted diamond
                </button>
              </router-link>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { RefreshIcon, CheckIcon } from "@heroicons/vue/outline";

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    RefreshIcon,
    CheckIcon,
  },

  props: ["status", "token"],

  setup() {
    const open = ref(false);

    return {
      open,
    };
  },
};
</script>
