import { defineStore } from 'pinia';
import type { UserPostResponseDTO } from '~/types/dtos';

interface TokenStoreState {
  hotPosts: UserPostResponseDTO[];
}

export const useTokenStore = defineStore({
  id: 'token',
  state: (): TokenStoreState => ({
    hotPosts: [],
  }),
  actions: {
    setHotPosts(hotPosts: UserPostResponseDTO[]) {
      this.hotPosts = hotPosts;
    },
    addHotPosts(newHotPosts: UserPostResponseDTO[]) {
      this.hotPosts.push(...newHotPosts);
    },
    likePost(postId: string) {
      const post = this.hotPosts.find((post) => post.id === postId);
      if (post) {
        post.likeCount += 1;
        post.isLiked = true;
      }
    },
    unlikePost(postId: string) {
      const post = this.hotPosts.find((post) => post.id === postId);
      if (post) {
        post.likeCount -= 1;
        post.isLiked = false;
      }
    },
  },
});
