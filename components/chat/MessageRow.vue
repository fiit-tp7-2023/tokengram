<template>
  <div class="w-full flex justify-between rounded px-2 py-2" :class="[mine ? 'bg-blue-400' : 'bg-white']">
    <p>{{ message.content }}</p>
  </div>
</template>

<script lang="ts" setup>
import { type ChatMessageResponseDTO } from '~/types/dtos';
defineProps({
  message: {
    type: Object as PropType<ChatMessageResponseDTO>,
    required: true,
  },
  mine: {
    type: Boolean,
    default: true,
  },
});
</script>

<style></style>
