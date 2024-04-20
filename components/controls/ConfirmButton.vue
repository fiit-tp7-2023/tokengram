<template>
  <button
    class="w-full border-2 p-2 rounded-md bg-primary"
    :class="{
      'bg-pink-500': primary && !disabled,
      'bg-gray-500 cursor-not-allowed': disabled,
    }"
    @click="!disabled && $emit('click')"
  >
    {{ text }}
  </button>
</template>

<script lang="ts" setup>
defineEmits(['click']);
defineProps({
  text: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'primary',
  },
  primary: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style></style>
