<template>
  <div class="flex flex-col justify-left items-left h-60 border-gray-300 bg-white border-2 mx-4 my-2 rounded">
    <div class="border-gray-300 border-2 p-4 height-300 m-4 flex justify-center items-center rounded">
      <p>image here</p>
    </div>
    <div class="flex flex-row grid-cols-2 gap-3 mx-4 my-2">
      <div>
        <p>pfp</p>
      </div>
      <div class="font-bold text-lg">
        <p>{{ post.owner.username }}</p>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NFTPost } from '~/types/dtos';

defineProps<{
  post: NFTPost;
}>();
</script>

<style></style>
