import type { Message, NFTPost, User } from '~/types/dtos';

export const MOCKED_USERS: User[] = [
  {
    address: '0xabcde',
    username: 'Dano',
  },
  {
    address: '0xcdefg',
    username: 'Deno',
  },
  {
    address: '0xde141',
    username: 'Zdeno',
  },
  {
    address: '0x123abc',
  },
];

export const MOCKED_POSTS: NFTPost[] = [
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

export const MOCKED_DANO_CHATS: Message[] = [
  {
    id: '1',
    author: '0xabcde',
    text: 'Prva sprava',
    likes: 1,
  },
  {
    id: '2',
    author: '0xabcde',
    text: 'Druha sprava',
    likes: 5,
  },
  {
    id: '3',
    author: '0xabcde',
    text: 'Tretia sprava',
  },
];
