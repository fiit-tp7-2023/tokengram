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
