<template>
  <div class="flex flex-col gap-2 mt-2">
    <SignTest />

    <NftPost v-for="con of content" :key="con" />
  </div>
</template>
<script lang="ts" setup>
import NftPost from '~/components/posts/NftPost.vue';
import SignTest from '~/components/SignTest.vue';

const content = [1, 2, 3];
</script>
