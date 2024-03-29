import { defineStore } from 'pinia';
import type { NFTPost } from '~/types/dtos';

interface TokenStoreState {
  posts: NFTPost[];
}

export const useTokenStore = defineStore({
  id: 'token',
  state: (): TokenStoreState => ({
    posts: [],
  }),
  actions: {
    setPosts(posts: NFTPost[]) {
      this.posts = posts;
    },
  },
});
