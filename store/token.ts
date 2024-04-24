import { defineStore } from 'pinia';
import type { NFTPost, UserPostResponseDTO } from '~/types/dtos';

interface TokenStoreState {
  posts: NFTPost[];
  hotPosts: UserPostResponseDTO[];
}

export const useTokenStore = defineStore({
  id: 'token',
  state: (): TokenStoreState => ({
    posts: [],
    hotPosts: [],
  }),
  actions: {
    setPosts(posts: NFTPost[]) {
      this.posts = posts;
    },
    setHotPosts(hotPosts: UserPostResponseDTO[]) {
      this.hotPosts = hotPosts;
    },
    addHotPosts(newHotPosts: UserPostResponseDTO[]) {
      this.hotPosts.push(...newHotPosts);
    },
  },
});
