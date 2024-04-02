<template>
  <nuxt-link :to="'/chat/' + user.address">
    <span
      class="hidden w-0 md:flex md:gap-2 md:px-2 md:text-xl md:items-center md:justify-start md:w-full md:h-10"
      :class="{ 'bg-slate-300': selected }"
    >
      <div class="w-5 h-5 bg-slate-500 rounded-full"></div>
      <p>{{ user.username ?? user.address }}</p>
    </span>

    <span class="md:hidden md:w-0 flex justify-end w-full h-10 gap-1 px-3">
      <p
        class="w-8 h-8 flex justify-center items-center bg-slate-200 rounded-full"
        :class="{ 'bg-slate-400': selected }"
      >
        {{ (user.username ?? user.address)?.charAt(0) }}
      </p>
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
