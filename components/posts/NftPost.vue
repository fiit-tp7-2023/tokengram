<template>
  <div
    :class="{ expanded: isExpanded, collapsed: !isExpanded }"
    class="flex flex-col justify-between items-left bg-slate-900 border-2 rounded mx-auto post-content my-4"
  >
    <div class="w-8/10 mx-auto flex justify-center items-center rounded">
      <picture>
        <source v-for="source in sources" :key="source" :srcset="source" />
        <img class="object-cover" src="/not-found-image.webp" alt="NFTs" />
      </picture>
    </div>

    <!-- NFT name and owner address -->

    <div class="flex flex-row grid-cols-2 gap-3 mx-4 my-2 justify-between border-b-4">
      <div>
        <p>{{ post.nft.name }}</p>
      </div>
      <div class="account">
        <span>Owned by: </span>
        <NuxtLink class="acc-link" :to="`/profile/${post.ownerAddress}`">{{
          shortenAddress(post.ownerAddress)
        }}</NuxtLink>
      </div>
    </div>

    <!-- like and comments -->

    <div class="mx-4 flex flex-wrap items-center gap-2 justify-between">
      <div class="flex items-center gap-2">
        <button class="text-white px-2 py-1 rounded" @click="likePost">
          <icon size="24" :name="'mdi:like-outline'" />
        </button>
        <span>{{ post.likeCount }}</span>
        <button class="text-white px-2 py-1 rounded" @click="commentOnPost">
          <icon size="24" :name="'mdi:comment-outline'" />
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
  </div>
</template>

<script setup lang="ts">
import { $purify } from '@kodadot1/minipfs';
import type { UserPostResponseDTO } from '~/types/dtos';

const props = defineProps<{
  post: UserPostResponseDTO;
}>();

const isExpanded = ref(false);

const expandWindow = () => {
  isExpanded.value = true;
};
const hideWindow = () => {
  isExpanded.value = false;
};

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

const likePost = () => {
  // TODO: Implement like post
};

const commentOnPost = () => {
  // TODO: Implement comment on post
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
