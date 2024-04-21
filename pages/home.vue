<template>
  <div class="h-full w-full overflow-y-auto">
    <div class="grid grid-cols-1 md:grid-cols-1 gap-0.5 mt-2 justify-center items-center min-h-full">
      <NftPost v-for="post in mockedPosts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import NftPost from '~/components/posts/NftPost.vue';
import { useTokenStore } from '~/store';
import type { UserPostResponseDTO } from '~/types/dtos';

const tokenStore = useTokenStore();

// const posts = computed(() => tokenStore.posts);

const mockedPosts: UserPostResponseDTO[] = [
  {
    id: '0x0000000000000000000000000000000000000001_ETH_1',
    ownerAddress: '0xFa85ef821C17BD3C4c02298DF335b8187088363F',
    nft: {
      address: '0x0000000000000000000000000000000000000001',
      tokenId: '1',
      name: 'Mock NFT 1',
      description:
        'Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description',
      image: 'https://nft.blockgames.com/dice/dices_multiplier_4.gif',
      animationUrl: 'https://nft.blockgames.com/dice/dices_multiplier_4.mp4',
      nftVector: '',
      createdAtBlock: 1,
      attributes: [
        {
          traitType: 'Rarity',
          value: 'Common',
        },
        {
          traitType: 'Type',
          value: 'Dice',
        },
        {
          traitType: 'Material',
          value: 'Wood',
        },
      ],
      tags: ['dice', 'common', 'wood'],
    },
    description: 'This is a description of NFT 1',
    commentCount: 0,
    likeCount: 0,
    isVisible: true,
    isLiked: false,
    createdAt: new Date().toDateString(),
  },
  {
    id: '0x0000000000000000000000000000000000000001_ETH_1',
    ownerAddress: '0xFa85ef821C17BD3C4c02298DF335b8187088363F',
    nft: {
      address: '0x0000000000000000000000000000000000000001',
      tokenId: '1',
      name: 'Mock NFT 1',
      description:
        'Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description',
      image: 'https://nft.blockgames.com/dice/dices_multiplier_4.gif',
      animationUrl: 'https://nft.blockgames.com/dice/dices_multiplier_4.mp4',
      nftVector: '',
      createdAtBlock: 1,
      attributes: [
        {
          traitType: 'Rarity',
          value: 'Common',
        },
        {
          traitType: 'Type',
          value: 'Dice',
        },
        {
          traitType: 'Material',
          value: 'Wood',
        },
      ],
      tags: ['dice', 'common', 'wood'],
    },
    commentCount: 0,
    likeCount: 0,
    isVisible: true,
    isLiked: false,
    createdAt: new Date().toDateString(),
  },
  {
    id: '0x0000000000000000000000000000000000000001_ETH_1',
    ownerAddress: '0xFa85ef821C17BD3C4c02298DF335b8187088363F',
    nft: {
      address: '0x0000000000000000000000000000000000000001',
      tokenId: '1',
      name: 'Mock NFT 1',
      description:
        'Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description, Mock NFT 1 description',
      image: 'https://nft.blockgames.com/dice/dices_multiplier_4.gif',
      animationUrl: 'https://nft.blockgames.com/dice/dices_multiplier_4.mp4',
      nftVector: '',
      createdAtBlock: 1,
      attributes: [
        {
          traitType: 'Rarity',
          value: 'Common',
        },
        {
          traitType: 'Type',
          value: 'Dice',
        },
        {
          traitType: 'Material',
          value: 'Wood',
        },
        {
          traitType: 'Material',
          value: 'Wood',
        },
      ],
      tags: ['dice', 'common', 'wood'],
    },
    description: 'This is a description of NFT 1',
    commentCount: 0,
    likeCount: 0,
    isVisible: true,
    isLiked: false,
    createdAt: new Date().toDateString(),
  },
];
</script>
