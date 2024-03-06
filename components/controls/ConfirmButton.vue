<template>
  <button class="w-full border-2 p-2 rounded-md bg-primary" @click="$emit('click')">{{ text }}</button>
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
});
</script>

<style></style>
