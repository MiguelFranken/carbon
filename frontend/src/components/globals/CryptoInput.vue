<template>
  <div class="pixelated">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium leading-5 text-gray-700"
    >
      {{ label }}
    </label>
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
      >
        <div class="pl-4">
          <i class="nes-icon search is-small" />
        </div>
      </div>
      <span
        v-if="showResetButton && modelValue && modelValue !== ''"
        class="absolute inset-y-0 right-0 flex items-center pr-4 hover:text-blueish nes-pointer"
        @click.prevent="reset"
        @mousedown.prevent
        @mouseup.prevent
      >
        <i class="nes-icon times is-small" />
      </span>
      <input
        :id="id"
        :value="modelValue"
        :name="name"
        :type="type"
        class="block w-full px-3 py-2 sm:text-sm sm:leading-5 border-gray-800 border-4 focus:outline-none focus:ring-0 focus:border-blueish"
        :class="{
          'pl-9': icon,
          'px-2': !icon,
          'pr-9': showResetButton,
          'shadow-sm': shadow,
        }"
        :autofocus="autofocus"
        :required="required"
        :placeholder="placeholder"
        autocomplete="off"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
      />
    </div>
  </div>
</template>

<script>
import { debounce } from "debounce";

export default {
  props: {
    modelValue: undefined,

    placeholder: {
      type: String,
      default: "",
    },

    icon: {
      type: String,
      default: undefined,
    },

    showResetButton: {
      type: Boolean,
      default: true,
    },

    required: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      default: undefined,
    },

    autofocus: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      default: "text",
    },

    shadow: {
      type: Boolean,
      default: true,
    },

    label: {
      type: String,
      default: undefined,
    },

    debounce: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      hasFocus: false,
      id: null,
      updater: null,
    };
  },

  created() {
    this.updater = debounce(
      (value) => this.emitModelUpdate(value),
      this.debounce
    );
  },

  mounted() {
    this.id = this._uid;
  },

  methods: {
    onInput(event) {
      if (event.target) {
        const value = event.target.value;
        // debounce updating when input value is not an empty string
        if (value === "") {
          this.updater.clear();
          this.emitModelUpdate(value);
        } else {
          this.updater(value);
        }
      }
    },

    emitModelUpdate(value) {
      this.$emit("update:modelValue", value);
    },

    onBlur(event) {
      this.$emit("input::blur", event);
    },

    onFocus(event) {
      this.$emit("input::focus", event);
    },

    reset() {
      this.$emit("update:modelValue", "");
    },
  },
};
</script>

<style scoped>
.icon {
  display: inline-block;
  height: 1em;
  width: 1em;
  vertical-align: bottom;
}
</style>
