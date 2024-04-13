<template>
  <div class="wrapper" :class="[mine ? 'justify-start' : 'justify-end']">
    <div class="w-min min-w-40" :class="[mine ? 'my-message' : 'their-message']">
      <p>{{ message.content }}</p>
      <sub class="w-full text-end block my-2">{{ formattedDate }}</sub>
    </div>
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

<style>
.wrapper {
  @apply w-full flex;
}
.my-message {
  @apply bg-transparent border border-pink-500 rounded px-2 py-2;
  sub {
    @apply text-pink-500;
  }
}
.their-message {
  @apply bg-transparent border border-white rounded px-2 py-2;
}
</style>
