<template>
  <div>Your profile</div>
  <div class="w-full flex flex-col gap-2 mt-2">
    <nft-post
      v-for="post in posts"
      :key="post.nft.address"
      :post="post"
      mine
      @update="(v) => updatePost(post.nft.address, v)"
    />
  </div>
</template>

<script lang="ts" setup>
import NftPost from '~/components/posts/NftPost.vue';
import { useAccountStore } from '~/store';
import type { PostResponseDTO } from '~/types/dtos';

const posts = ref<PostResponseDTO[]>([]);
const accountStore = useAccountStore();
const pageSize = 20;
const pageNumber = ref(1);
onMounted(async () => {
  if (!accountStore.accessToken) {
    return;
  }

  const params = new URLSearchParams({
    pageNumber: String(pageNumber.value),
    pageSize: String(pageSize),
  });

  const _posts = await $fetch<PostResponseDTO[]>('/api/post/my?' + params.toString(), {
    headers: {
      Authorization: `Bearer ${accountStore.accessToken}`,
    },
  });
  posts.value = _posts;
});

const updatePost = (address: string, post: PostResponseDTO) => {
  const index = posts.value.findIndex((p) => p.nft.address === address);
  if (index === -1) {
    return;
  }
  posts.value[index] = post;
};
</script>

<style></style>
