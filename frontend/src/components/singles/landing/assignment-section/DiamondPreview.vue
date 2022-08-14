<template>
  <div class="flex flex-col">
    <div>
      <div class="flex flex-col">
        <img :src="src" alt="Preview" class="rounded-md" />
      </div>
    </div>
    <div class="mb-10 flex flex-col">
      <div class="flex items-center justify-center">
        <div>
          <button
            :disabled="size < 2"
            ontouchstart=""
            class="nes-btn px-3 pixelated"
            :class="{
              'is-disabled': size < 2,
            }"
            @click="decrease"
          >
            -
          </button>
        </div>
        <div class="p-4">
          <div class="flex flex-col justify-center items-center">
            <div class="highlighted">Size</div>
            <div class="font-semibold text-2xl">{{ size }}</div>
          </div>
        </div>
        <div>
          <button
            ontouchstart=""
            :disabled="size > 9"
            :class="{
              'is-disabled': size > 9,
            }"
            class="nes-btn px-3 pixelated"
            @click="increase"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useToken from "@/modules/token";
const { getImageSrc } = useToken();

export default {
  name: "DiamondPreview",

  data() {
    return {
      size: 5,
      savedSize: 5,
      currentDiamond: this.getRandomTokenId(),
    };
  },

  computed: {
    src() {
      return getImageSrc({
        size: this.savedSize,
        id: this.currentDiamond,
      });
    },
  },

  methods: {
    increase() {
      this.size = Math.min(10, this.size + 1);
      this.generate();
    },

    decrease() {
      this.size = Math.max(1, this.size - 1);
      this.generate();
    },

    generate() {
      this.savedSize = this.size;
      this.currentDiamond = this.getRandomTokenId();
    },

    getRandomTokenId() {
      return this.getRandomInt(1, 20);
    },

    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    },
  },
};
</script>

<style scoped></style>
