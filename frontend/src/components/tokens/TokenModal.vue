<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      class="fixed z-10 inset-0 overflow-y-auto"
      :open="open"
      @close="$emit('modal::close')"
    >
      <div
        class="flex items-end justify-center min-h-screen text-center sm:block p-0"
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
            class="inline-block align-bottom rounded-lg p-0 text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
          >
            <!--            <div class="sm:flex sm:items-start">-->
            <div>
              <div class="text-center sm:text-left">
                <div class="flex justify-center">
                  <DialogTitle
                    as="h3"
                    class="text-3xl leading-6 font-medium inline-block mt-2 text-gray-400"
                  >
                    Diamond {{ token.id }}
                  </DialogTitle>
                </div>

                <div class="mt-6">
                  <p class="flex justify-center">
                    <img
                      :src="imgSrc"
                      alt=""
                      class="object-cover pointer-events-none group-hover:opacity-75 rounded-lg w-full"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-5 flex justify-center">
              <button
                type="button"
                class="text-sm font-medium nes-btn diamond-button"
                @click="openDetails"
              >
                See Details
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import useToken from "@/modules/token";
import { computed, toRefs } from "vue";

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },

  emits: ["modal::close"],

  props: ["open", "token"],

  methods: {
    openDetails() {
      this.$router.push(`/diamonds/${this.token.id}`);
    },
  },

  setup(props) {
    const { token } = toRefs(props);
    const { getImageSrc } = useToken();
    const imgSrc = computed(() => {
      return getImageSrc(token.value);
    });

    return {
      imgSrc,
    };
  },
};
</script>
