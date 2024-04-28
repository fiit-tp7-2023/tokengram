<template>
  <div class="w-full">
    <form class="flex justify-between gap-2" @submit.prevent="addComment">
      <input
        v-model="comment"
        class="w-full bg-transparent rounded py-2 px-2 border"
        type="text"
        placeholder="Add a comment"
      />
      <button
        class="text-white rounded p-2"
        type="submit"
        :class="{
          'bg-pink-500': accountStore.accessToken,
          'bg-gray-500 cursor-not-allowed': !accountStore.accessToken,
        }"
      >
        <icon size="24" name="mdi:send" />
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useAccountStore, useTokenStore } from '~/store';

const accountStore = useAccountStore();
const tokenStore = useTokenStore();

const props = defineProps<{
  postAddress: string;
}>();

console.log(props.postAddress);

const comment = ref('');

const addComment = async () => {
  const resp = await $fetch(`api/posts/${props.postAddress}/comments`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accountStore.accessToken}`,
    },
    body: JSON.stringify({
      content: comment.value,
    }),
  });
  // TODO: Add resp to store and update comment count for post
};
</script>

<style></style>
