<template>
  <div
    :class="{ expanded: isExpanded, collapsed: !isExpanded }"
    class="flex flex-col justify-between items-left bg-slate-900 border-2 rounded mx-auto post-content my-4"
  >
    <div class="w-8/10 mx-auto flex justify-center items-center rounded relative">
      <picture>
        <source v-for="source in sources" :key="source" :srcset="source" />
        <img class="object-cover" src="/not-found-image.webp" alt="NFTs" />
      </picture>

      <button
        v-if="mine && editable"
        class="text-white hover:text-pink-500 hover:border-pink-500 border-2 rounded-full p-2 absolute right-2 top-2"
        @click="$emit('update')"
      >
        <icon :name="!post.isVisible ? 'mdi:eye-off-outline' : 'mdi:eye-outline'" size="32" />
      </button>
    </div>

    <!-- NFT name and owner address -->

    <div class="flex flex-row grid-cols-2 gap-3 mx-4 my-2 justify-between border-b-4">
      <div>
        <p>{{ post.nft.name }}</p>
      </div>
      <div class="account">
        <span>Owned by: </span>
        <NuxtLink v-if="!mine" class="acc-link" :to="`/profile/${post.ownerAddress}`">{{
          shortenAddress(post.ownerAddress)
        }}</NuxtLink>
        <NuxtLink v-else to="/profile">{{ shortenAddress(post.ownerAddress) }}</NuxtLink>
      </div>
    </div>

    <!-- like and comments -->

    <div class="mx-4 flex flex-wrap items-center gap-2 justify-between">
      <div class="flex items-center gap-2">
        <button
          :class="{
            'text-white hover:text-pink-500': !post.isLiked,
            'text-pink-500 hover:text-white': post.isLiked,
            'cursor-not-allowed': !accountStore.accessToken,
          }"
          class="px-2 py-1 rounded"
          @click="toggleLike"
        >
          <icon size="24" :name="post.isLiked ? 'mdi:like' : 'mdi:like-outline'" />
        </button>
        <span>{{ post.likeCount }}</span>
        <button
          :class="{
            'text-white hover:text-pink-500': !commentsExpanded,
            'text-pink-500 hover:text-white': commentsExpanded,
          }"
          class="text-white px-2 py-1 rounded"
          @click="loadComments"
        >
          <icon size="24" :name="commentsExpanded ? 'mdi:comment' : 'mdi:comment-outline'" />
        </button>
        <span>{{ post.commentCount }}</span>
      </div>
    </div>
    <div v-show="!isExpanded" class="show-less flex flex-col">
      <div class="mx-4 my-2">
        <p>{{ limitDescription((post.description ?? post.nft?.description) || '') }}</p>
      </div>
      <div class="mx-4 my-2 flex flex-wrap items-center gap-2 justify-between">
        <div class="flex flex-wrap gap-2">
          <template v-for="tag in limitedTags(post)" :key="tag">
            <p class="bg-slate-600 text-white px-2 py-1 rounded">{{ tag.type }}</p>
          </template>
        </div>
        <p class="show-more underline text-gray-300 cursor-pointer" @click="expandWindow">Show more</p>
      </div>
    </div>

    <!-- Show more details about NFT -->

    <div v-show="isExpanded" class="show-more">
      <div class="mx-4 my-2">
        <p>{{ (post.description ?? post.nft?.description) || '' }}</p>
      </div>

      <div class="mx-4 my-2 flex flex-wrap items-center gap-2 justify-between">
        <div class="flex flex-wrap gap-2">
          <span>Tags: </span>
          <template v-for="tag in post.nft.tags" :key="tag">
            <p class="bg-slate-600 text-white px-2 py-1 rounded">{{ tag.type }}</p>
          </template>
        </div>
      </div>

      <!-- Details about NFT, Collection address, TokenId, Attributes-->

      <div class="border-t-4 mx-4 my-2 flex flex-wrap items-center gap-2 justify-between">
        <p class="w-full my-2 text-lg font-bold">Nft Details</p>
        <div class="flex flex-wrap gap-2">
          <span>Collection: </span>
          <p class="text-white rounded">{{ post.nft.address }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span>TokenId: </span>
          <p class="text-white rounded">{{ post.nft.tokenId }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span>Attributes: </span>
          <template v-for="attr in post.nft.attributes" :key="attr.traitType">
            <p class="bg-slate-600 text-white px-2 py-1 rounded">{{ attr.traitType }}: {{ attr.value }}</p>
          </template>
        </div>
        <p class="show-more underline text-gray-300 cursor-pointer text-right w-full" @click="hideWindow">Show less</p>
      </div>
    </div>

    <!-- Comments -->

    <div v-if="commentsExpanded" class="border-t-4 mx-4 my-2 flex flex-col gap-2">
      <p class="w-full my-2 text-lg font-bold">Comment section</p>

      <div class="flex justify-center items-center">
        <AddComment :post-address="post.nft.address" @add="addComment" />
      </div>

      <template v-for="comment in comments" :key="comment.id">
        <CommentEntry :comment="comment" />
      </template>

      <div v-if="hasMoreComments" class="flex justify-center items-center">
        <button class="text-white bg-pink-500 rounded p-2 w-full" @click="loadMoreComments">Load more</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { $purify } from '@kodadot1/minipfs';
import AddComment from './AddComment.vue.vue';
import CommentEntry from './CommentEntry.vue';
import { useAccountStore, useTokenStore, useNotificationStore } from '~/store';
import type { CommentDTO, UserPostResponseDTO } from '~/types/dtos';

const emit = defineEmits(['update', 'like', 'unlike']);

const props = defineProps<{
  post: UserPostResponseDTO;
  editable?: boolean;
}>();

const accountStore = useAccountStore();
const tokenStore = useTokenStore();
const notificationStore = useNotificationStore();

const mine = computed(() => props.post.ownerAddress === accountStore.address);
const comments = computed(() => tokenStore.getCommentsForPost(props.post.nft.address));
const isExpanded = ref(false);

const expandWindow = () => {
  isExpanded.value = true;
};
const hideWindow = () => {
  isExpanded.value = false;
};

const commentsExpanded = ref(false);

// make async function
const sources = ref<string[]>([]);

onMounted(() => {
  if (props.post.nft.image) {
    sources.value = $purify(props.post.nft.image);
  }
});

const shortenAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

const limitDescription = (description: string) =>
  description.length > 100 ? `${description.slice(0, 100)}...` : description;

const commentsPageNumber = ref(1);
const hasMoreComments = ref(true);
const commentsPageSize = 10;

const loadMoreComments = async () => {
  const params: URLSearchParams = new URLSearchParams({
    pageNumber: String(commentsPageNumber.value),
    pageSize: String(commentsPageSize),
  });
  const resp = await $fetch(`/api/posts/${props.post.nft.address}/comments?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accountStore.accessToken}`,
    },
  });
  tokenStore.addComments(resp);
  if (resp.length === 0 || resp.length < commentsPageSize) {
    hasMoreComments.value = false;
  }
  commentsPageNumber.value += 1;
};

const loadComments = async () => {
  commentsExpanded.value = !commentsExpanded.value;
  hasMoreComments.value = true;
  commentsPageNumber.value = 1;
  tokenStore.setComments([]);
  await loadMoreComments();
};

const addComment = async (comment: CommentDTO) => {
  const resp = await $fetch(`/api/posts/${props.post.nft.address}/comments`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accountStore.accessToken}`,
    },
    body: JSON.stringify({
      content: comment,
    }),
  });
  tokenStore.prependComment(resp);
  tokenStore.incrementCommentCount(comment.postNFTAddress);
  notificationStore.addNotification('Comment', 'Comment added successfully', 'success');
};

const limitedTags = (post: UserPostResponseDTO) => {
  const MAX_TAGS = 6;
  const MAX_CHARACTERS = 35;

  let totalCharacters = 0;
  if (!post.nft.tags) {
    return;
  }
  return post.nft.tags.filter((tag, index) => {
    totalCharacters += tag.type.length;
    return index < MAX_TAGS && totalCharacters <= MAX_CHARACTERS;
  });
};

const toggleLike = async () => {
  if (!accountStore.accessToken) {
    return;
  }

  if (props.post.isLiked) {
    await $fetch(`/api/posts/${props.post.nft.address}/like`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accountStore.accessToken}`,
      },
    });
    emit('unlike');
    return;
  }
  await $fetch(`/api/posts/${props.post.nft.address}/like`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accountStore.accessToken}`,
    },
  });
  emit('like');
};
</script>

<style>
.post-content {
  width: 100%;
  max-width: 600px;
  min-height: 730px;
}
.account {
  span {
    @apply text-gray-300;
  }
  .acc-link {
    @apply hover:text-pink-300;
  }
}
.show-more {
  @apply hover:text-pink-300;
}
</style>
