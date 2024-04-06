<template>
  <div class="w-min min-w-40 rounded px-2 py-2" :class="[mine ? 'bg-blue-400 text-white' : 'bg-white']">
    <p>{{ message.content }}</p>
    <sub class="w-full text-end block my-2">{{ formattedDate }}</sub>
  </div>
</template>

<script lang="ts" setup>
import { type ChatMessageResponseDTO } from '~/types/dtos';
const props = defineProps({
  message: {
    type: Object as PropType<ChatMessageResponseDTO>,
    required: true,
  },
  mine: {
    type: Boolean,
    default: true,
  },
});

const date = new Date(props.message.createdAt);

const formattedDate = `${date.getHours()}:${date.getMinutes()}`;
</script>

<style></style>
