<template>
  <nuxt-link :to="'/chat/' + chat.id" class="w-full flex gap-2 text-xl items-center justify-start h-10">
    <span class="w-5 h-5 border border-pink-500 rounded-full" :class="[selected ? 'bg-pink-500' : 'bg-transparent']" />
    <p>{{ chat.name ?? chat.users }}</p>
  </nuxt-link>
</template>

<script lang="ts" setup>
import type { ChatResponseDTO } from '~/types/dtos';

defineProps({
  chat: {
    type: Object as PropType<ChatResponseDTO>,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});
</script>
