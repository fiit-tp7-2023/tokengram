<template>
  <div class="w-full flex flex-col gap-2 mt-2">
    <NftPost v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script lang="ts" setup>
import NftPost from '~/components/posts/NftPost.vue';
import { useTokenStore } from '~/store';

const tokenStore = useTokenStore();

const posts = computed(() => tokenStore.posts);
</script>
