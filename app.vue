<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useTokenStore } from '~/store';
import { MOCKED_POSTS } from '~/mocks';

const tokenStore = useTokenStore();

onMounted(() => {
  // Mock posts
  tokenStore.setPosts(MOCKED_POSTS);
});
</script>
<style>
div,
span,
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  @apply font-mono text-white;
}
body {
  @apply bg-slate-800;
}
</style>
