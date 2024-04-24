<template>
  <div class="h-full w-full overflow-y-auto">
    <div class="grid grid-cols-1 md:grid-cols-1 gap-5 mt-2 justify-center items-center min-h-full">
      <NftPost v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <button class="text-white bg-pink-500 rounded p-2 w-full" @click="loadMore">Load more</button>
  </div>
</template>

<script lang="ts" setup>
import NftPost from '~/components/posts/NftPost.vue';
import { useTokenStore, useAccountStore } from '~/store';

const tokenStore = useTokenStore();
const accountStore = useAccountStore();
const logger = useLogger('HOME');

const posts = computed(() => tokenStore.hotPosts);

onMounted(() => {
  (async () => {
    await fetchHotPosts();
  })();
});

const pageNumber = ref(1);
const hasMore = ref(true);
const pageSize = 10;

const loadMore = async () => {
  try {
    pageNumber.value += 1;
    const params: URLSearchParams = new URLSearchParams({
      pageNumber: String(pageNumber.value),
      pageSize: String(pageSize),
    });
    const resp = await $fetch(`/api/posts/hot-posts?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${accountStore.accessToken}`,
      },
    });
    if (resp.length === 0) {
      hasMore.value = false;
      return;
    }
    tokenStore.addHotPosts(resp);
  } catch (error) {
    logger.error(error);
  }
};

const fetchHotPosts = async () => {
  try {
    const params: URLSearchParams = new URLSearchParams({
      pageNumber: String(pageNumber.value),
      pageSize: String(pageSize),
    });
    const resp = await $fetch(`/api/posts/hot-posts?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${accountStore.accessToken}`,
      },
    });
    tokenStore.addHotPosts(resp);
  } catch (error) {}
};
</script>
