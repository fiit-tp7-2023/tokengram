<template>
  <nuxt-link :to="'/chat/' + user.address">
    <span class="flex gap-1 px-2 text-xl items-center justify-start w-full h-10" :class="{ 'bg-slate-300': selected }">
      <div class="w-5 h-5 bg-slate-500 rounded-full"></div>
      <p>{{ user.username ?? user.address }}</p>
    </span>
  </nuxt-link>
</template>

<script lang="ts" setup>
import type { User } from '~/types/dtos';

defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});
</script>

<style></style>
