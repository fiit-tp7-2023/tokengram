<template>
  <div class="flex flex-col gap-2 border-t-2 py-2">
    <div class="flex justify-between">
      <NuxtLink v-if="!mine" class="acc-link" :to="`/profile/${comment.commenter.address}`">{{
        shortAddress
      }}</NuxtLink>
      <NuxtLink v-else class="acc-link" to="/profile">{{ shortAddress }}</NuxtLink>
      <span class="text-gray-300">{{ formatDate(comment.createdAt) }}</span>
    </div>
    <p class="text-white">
      {{ content
      }}<span
        v-if="comment.content.length > 100 && isExpanded == false"
        class="show-more cursor-pointer text-pink-500 hover:text-pink-700"
        @click="expand"
        >show more</span
      >
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { CommentDTO } from '~/types/dtos';
import { useAccountStore } from '~/store';

const accountStore = useAccountStore();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const props = defineProps<{
  comment: CommentDTO;
}>();
const limitCommentText = (text: string) => {
  if (text.length > 100) {
    return `${text.slice(0, 100)}...`;
  }
  return text;
};

const mine = computed(() => props.comment.commenter.address === accountStore.address);
const shortAddress = props.comment.commenter.address.slice(0, 6) + '...' + props.comment.commenter.address.slice(-4);
const content = ref(limitCommentText(props.comment.content));
const isExpanded = ref(false);

const expand = () => {
  isExpanded.value = true;
  content.value = props.comment.content;
};
</script>

<style>
.acc-link {
  @apply hover:text-pink-300;
}

.show-more {
  @apply hover:text-pink-300;
}
</style>
