<template>
  <div class="w-full flex flex-col gap-2 mt-2">
    <nft-post v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script lang="ts" setup>
import NftPost from '~/components/posts/NftPost.vue';
import { useAccountStore, useTokenStore } from '~/store';

const tokenStore = useTokenStore();
const accountStore = useAccountStore();

const posts = computed(() => tokenStore.posts);

onMounted(async () => {
  if (!accountStore.accessToken) {
    return;
  }
  const params: URLSearchParams = new URLSearchParams({
    pageNumber: String(1),
    pageSize: '20',
  });
  const posts = await $fetch('/api/post/hot?' + params.toString(), {
    headers: {
      Authorization: `Bearer ${accountStore.accessToken}`,
    },
  });
  console.log(posts);
});
</script>
