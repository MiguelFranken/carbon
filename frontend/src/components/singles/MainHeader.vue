<template>
  <Popover
    class="w-full"
    :class="{
      absolute: routeName === 'home',
    }"
  >
    <div
      class="flex justify-between items-center max-w-7xl mx-auto px-4 py-10 sm:px-6 md:justify-start md:space-x-10 lg:px-8"
    >
      <PopoverGroup as="nav" class="hidden md:flex space-x-10 pixelated">
        <router-link
          class="text-sm font-medium nes-btn"
          :class="{
            'crypto-button-border-gray': routeName !== 'home',
            'cock-button crypto-button-border-blue': routeName === 'cocks',
            'is-disabled pointer-events-none': !isGalleryEnabled,
          }"
          to="/cocks"
        >
          Gallery
        </router-link>

        <router-link
          class="text-sm font-medium nes-btn"
          :class="{
            'crypto-button-border-gray': routeName !== 'home',
            'cock-button crypto-button-border-blue': routeName === 'mint',
            'is-disabled pointer-events-none': !isMintingEnabled,
          }"
          to="/mint"
        >
          Mint
        </router-link>

        <router-link
          class="text-sm font-medium nes-btn"
          to="/faq"
          :class="{
            'crypto-button-border-gray': routeName !== 'home',
            'cock-button crypto-button-border-blue': routeName === 'faq',
          }"
        >
          FAQ
        </router-link>
      </PopoverGroup>

      <!-- Menu Button Small Screens -->
      <div class="-mr-2 -my-2 md:hidden">
        <PopoverButton
          class="p-2 inline-flex items-center justify-center text-gray-900 nes-btn"
        >
          <span class="sr-only">Open menu</span>
          <MenuIcon class="h-6 w-6" aria-hidden="true" />
        </PopoverButton>
      </div>

      <div
        class="justify-center lg:w-0 lg:flex-1 hidden lg:flex"
        :class="{
          'opacity-0': routeName === 'home',
        }"
      >
        <router-link to="/">
          <span class="sr-only">CryptoCocks</span>
          <CryptoImage imgClass="h-20 w-auto" src="/logo.png" alt="Logo" />
        </router-link>
      </div>

      <!-- Right Side -->
      <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
        <button
          v-if="!isUserConnected"
          class="whitespace-nowrap text-sm font-medium nes-btn pixelated cock-button"
          :class="{
            'crypto-button-border-blue': routeName !== 'home',
          }"
          @click="connectWeb3Modal"
        >
          Connect Wallet
        </button>
        <button
          v-else
          class="whitespace-nowrap text-sm font-medium nes-btn pixelated cock-button"
          @click="disconnectWeb3Modal"
        >
          Disconnect {{ getActiveAccount.substring(0, 7) }}...
        </button>
      </div>
    </div>

    <!-- Overlay Menu for Small Screens-->
    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <PopoverPanel
        focus
        class="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
      >
        <PopoverOverlay
          class="fixed inset-0 bg-gray-900 bg-opacity-90 transition-opacity min-h-screen"
        />

        <div class="pixelated-container w-full">
          <div class="pixelated-sub-container !px-0 w-full">
            <div class="flex flex-row-reverse items-center justify-between">
              <PopoverButton
                class="pr-8 py-4 inline-flex items-center justify-center text-gray-700 hover:text-gray-600 focus:outline-none"
              >
                <span class="sr-only">Close Menu</span>
                <i class="nes-icon times" style="transform: scale(2.6)" />
              </PopoverButton>
            </div>
            <div class="mt-6">
              <nav class="grid grid-cols-1 gap-7">
                <PopoverButton
                  as="template"
                  v-for="item in showableOverlayMenuItems"
                  :key="item.name"
                >
                  <router-link
                    :to="item.href"
                    class="flex items-center rounded-lg hover:bg-gray-50 px-4"
                  >
                    <button
                      class="text-base font-medium text-gray-900 nes-btn cock-button w-full p-6"
                    >
                      {{ item.name }}
                    </button>
                  </router-link>
                </PopoverButton>
              </nav>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import { computed } from "vue";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  PopoverOverlay,
} from "@headlessui/vue";
import { AnnotationIcon, InboxIcon, MenuIcon } from "@heroicons/vue/outline";
import { useRoute } from "vue-router";
import { mapActions, mapGetters } from "vuex";
import CryptoImage from "@/components/globals/CryptoImage";

const overlayMenuItems = [
  {
    name: "Home",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "/",
    show: true,
    icon: InboxIcon,
  },
  {
    name: "Gallery",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "/cocks",
    show: true,
    icon: InboxIcon,
  },
  {
    name: "FAQ",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "/faq",
    show: true,
    icon: AnnotationIcon,
  },
];

export default {
  components: {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverOverlay,
    PopoverPanel,
    MenuIcon,
    CryptoImage,
  },

  computed: {
    isGalleryEnabled() {
      return process.env.VUE_APP_ENABLE_GALLERY === "true" || false;
    },

    isMintingEnabled() {
      return process.env.VUE_APP_ENABLE_MINTING === "true" || false;
    },

    ...mapGetters("accounts", [
      "getChainName",
      "isUserConnected",
      "getActiveAccount",
      "getWeb3Modal",
    ]),
  },

  methods: {
    ...mapActions("accounts", ["connectWeb3Modal", "disconnectWeb3Modal"]),
  },

  setup() {
    const route = useRoute();

    const routeName = computed(() => {
      return route.name;
    });

    const showableOverlayMenuItems = computed(() =>
      overlayMenuItems.filter((item) => !!item.show)
    );

    return {
      routeName,
      showableOverlayMenuItems,
    };
  },
};
</script>
