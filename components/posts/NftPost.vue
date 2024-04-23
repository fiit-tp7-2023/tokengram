<template>
  <div
    class="flex flex-col justify-left items-left h-60 border-gray-300 border-2 mx-4 my-2 rounded"
    :class="{ 'bg-gray-700': !post.isVisible }"
  >
    <div class="border-gray-300 border-2 p-4 height-300 m-4 flex justify-center items-center rounded">
      <p>image here</p>
    </div>
    <div class="flex flex-row grid-cols-2 gap-3 mx-4 my-2">
      <div>
        <p>pfp</p>
      </div>
      <div class="font-bold text-lg">
        <p>{{ post.ownerAddress }}</p>
      </div>
    </div>
    <div class="mx-4 my-2">
      <p>{{ post.description }}</p>
    </div>
    <div class="mx-4 my-2 flex flex-wrap items-center gap-2">
      <template v-for="attribute in post.nft.attributes" :key="attribute.traitType">
        <p class="bg-slate-600 text-white px-2 py-1 rounded">{{ attribute.traitType }}</p>
      </template>
      <p class="underline text-gray-300">Show more</p>
      <button v-if="mine" class="bg-white text-black p-2 rounded" @click="toggleVisibility">
        {{ post.isVisible ? 'Hide' : 'Make visible' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '~/store';
import type { PostResponseDTO } from '~/types/dtos';

const props = defineProps<{
  post: PostResponseDTO;
  mine: boolean;
}>();

const emit = defineEmits<{
  (e: 'update', v: PostResponseDTO): void;
}>();
const accountStore = useAccountStore();
const toggleVisibility = async () => {
  if (!accountStore.accessToken) {
    return;
  }
  const newPost = await $fetch(`/api/post/${props.post.nft.address}/settings`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accountStore.accessToken}`,
    },
    body: JSON.stringify({
      isVisible: !props.post.isVisible,
    }),
  });
  emit('update', newPost);
};
</script>
