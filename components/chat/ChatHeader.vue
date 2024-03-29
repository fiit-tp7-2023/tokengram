<template>
  <div class="flex w-full h-12 bg-slate-300 text-xl items-center pl-5 rounded-md my-2">
    {{ user?.username ?? user?.address ?? 'Missing user info' }}
  </div>
</template>

<script lang="ts" setup>
import type { User } from '~/types/dtos';

defineProps({
  user: {
    type: Object as PropType<User | null>,
    required: true,
  },
});
</script>

<style></style>
