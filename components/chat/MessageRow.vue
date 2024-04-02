<template>
  <div class="w-full flex justify-between rounded px-2 py-2" :class="[mine ? 'bg-blue-400' : 'bg-white']">
    <p>{{ message.text }}</p>
    <span v-if="message.likes" class="flex justify-end gap-1 items-center">
      <Icon name="mdi:heart" />
      <p v-if="message.likes > 1">{{ message.likes }}</p>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { type Message } from '~/types/dtos';
defineProps({
  message: {
    type: Object as PropType<Message>,
    required: true,
  },
  mine: {
    type: Boolean,
    default: true,
  },
});
</script>

<style></style>
