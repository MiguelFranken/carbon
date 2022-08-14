<template>
  <button
    type="button"
    class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-blue-500 transition duration-150 ease-in-out"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "CryptoButton",

  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
