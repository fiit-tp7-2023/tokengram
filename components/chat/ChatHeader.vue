<template>
  <div class="flex w-full bg-slate-300 text-xl items-center pl-5 py-2 rounded-md my-2">
    {{ chat.name ?? chat.users }}
  </div>
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

<style></style>
