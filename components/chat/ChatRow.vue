<template>
  <nuxt-link :to="'/chat/' + chat.id" class="w-full">
    <span class="hidden w-0 md:flex md:gap-2 md:px-2 md:text-xl md:items-center md:justify-start md:w-full md:h-10">
      <div class="w-5 h-5 bg-slate-500 rounded-full"></div>
      <p>{{ chat.name ?? chat.users }}</p>
    </span>

    <span class="md:hidden md:w-0 flex justify-end w-full h-10 gap-1 px-3">
      <p class="w-8 h-8 flex justify-center items-center bg-slate-200 rounded-full">
        {{ chat.name?.charAt(0) ?? '?' }}
      </p>
    </span>
  </nuxt-link>
</template>

<script lang="ts" setup>
import type { ChatResponseDTO } from '~/types/dtos';

defineProps({
  chat: {
    type: Object as PropType<ChatResponseDTO>,
    required: true,
  },
});
</script>
