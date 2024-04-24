<template>
  <div class="aspect-ratio-container mx-auto my-2" :class="{ expanded: isExpanded }">
    <div class="content">
      <div class="flex flex-col justify-left items-left bg-slate-900 border-2 rounded h-full">
        <div style="width: 90%" class="w-8/10 mx-auto flex justify-center items-center rounded">
          <img :src="post.nft.image" alt="NFTs" @error="handleImageError" />
        </div>

        <!-- NFT name and owner address -->

        <div class="flex flex-row grid-cols-2 gap-3 mx-4 my-6 justify-between border-b-4">
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
            <p class="show-more underline text-gray-300 cursor-pointer text-right w-full" @click="hideWindow">
              Show less
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserPostResponseDTO } from '~/types/dtos';

defineProps<{
  post: UserPostResponseDTO;
}>();

const isExpanded = ref(false);

const expandWindow = () => {
  isExpanded.value = true;
};
const hideWindow = () => {
  isExpanded.value = false;
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = './not-found-image.webp';
};

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
</script>

<style>
.aspect-ratio-container {
  width: 100%;
  position: relative;
  max-width: 600px;
}

.aspect-ratio-container:before {
  content: '';
  display: block;
  padding-top: 130%;
}

.aspect-ratio-container.expanded:before {
  padding-top: 0;
}

.aspect-ratio-container > .content {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.aspect-ratio-container.expanded > .content {
  position: static;
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

.content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
