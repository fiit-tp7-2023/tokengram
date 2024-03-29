<template>
  <div class="w-full flex flex-col gap-2 mt-2">
    <SignTest />

    <NftPost v-for="post in mockPosts" :key="post.id" :post="post" />
  </div>
</template>

<script lang="ts" setup>
import NftPost from '~/components/posts/NftPost.vue';
import SignTest from '~/components/SignTest.vue';
import type { NFTPost as TokenPost } from '~/types/dtos';

const mockPosts: TokenPost[] = [
  {
    id: '1',
    nft: {
      address: '0x60E4d786628Fea6478F785A6d7e704777c86a7c6',
      attributes: [
        { traitType: 'Background', value: 'M1 Orange' },
        { traitType: 'Fur', value: 'M1 Dark Brown' },
      ],
      tokenId: '4412',
      createdAtBlock: 1000,
    },
    description: 'Post description here ...',
    owner: { username: 'Username_1', address: 'user_address_1' },
    likes: [{ username: 'Liked_User_1', address: 'liked_user_address_1' }],
    comments: [{ username: 'Comment_User_1', address: 'comment_user_address_1', text: 'Comment text 1' }],
  },
  {
    id: '2',
    nft: {
      address: '0x60E4d786628Fea6478F785A6d7e704777c86a7c6',
      attributes: [
        { traitType: 'Background', value: 'M1 Aquamarine' },
        { traitType: 'Eyes', value: 'M1 Bored' },
      ],
      tokenId: '9541',
      createdAtBlock: 2000,
    },
    description: 'Another post description here ...',
    owner: { username: 'Username_2', address: 'user_address_2' },
    likes: [{ username: 'Liked_User_2', address: 'liked_user_address_2' }],
    comments: [{ username: 'Comment_User_2', address: 'comment_user_address_2', text: 'Comment text 2' }],
  },
  {
    id: '3',
    nft: {
      address: '0x60E4d786628Fea6478F785A6d7e704777c86a7c6',
      attributes: [
        { traitType: 'Fur', value: 'M1 Red' },
        { traitType: 'Eyes', value: 'M1 Bored' },
      ],
      tokenId: '11730',
      createdAtBlock: 3000,
    },
    description: 'Guess what, post description here ...',
    owner: { username: 'Username_3', address: 'user_address_3' },
    likes: [{ username: 'Liked_User_3', address: 'liked_user_address_3' }],
    comments: [{ username: 'Comment_User_3', address: 'comment_user_address_3', text: 'Comment text 3' }],
  },
  {
    id: '4',
    nft: {
      address: 'nft_address_4',
      name: 'NFT Name 4',
      uri: 'nft_uri_4',
      description: 'NFT Description 4',
      attributes: [
        { traitType: 'Background', value: 'M1 Yellow' },
        { traitType: 'Clothes', value: 'M1 Sailor Shirt' },
      ],
      tokenId: '1597',
      createdAtBlock: 4000,
    },
    description: 'Yes, another post description here ...',
    owner: { username: 'Username_4', address: 'user_address_4' },
    likes: [{ username: 'Liked_User_4', address: 'liked_user_address_4' }],
    comments: [{ username: 'Comment_User_4', address: 'comment_user_address_4', text: 'Comment text 4' }],
  },
];
</script>
