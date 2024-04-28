import { defineStore } from 'pinia';
import type { UserPostResponseDTO, CommentDTO } from '~/types/dtos';

interface TokenStoreState {
  hotPosts: UserPostResponseDTO[];
  comments: CommentDTO[];
}

export const useTokenStore = defineStore({
  id: 'token',
  state: (): TokenStoreState => ({
    hotPosts: [],
    comments: [],
  }),
  actions: {
    setHotPosts(hotPosts: UserPostResponseDTO[]) {
      this.hotPosts = hotPosts;
    },
    addHotPosts(newHotPosts: UserPostResponseDTO[]) {
      this.hotPosts.push(...newHotPosts);
    },
    setComments(comments: CommentDTO[]) {
      this.comments = comments;
    },
    addComments(comments: CommentDTO[]) {
      this.comments.push(...comments);
    },
    getCommentsForPost(postNFTAddress: string) {
      return this.comments.filter((comment) => comment.postNFTAddress === postNFTAddress);
    },
    likePost(postId: string) {
      const post = this.hotPosts.find((post) => post.id === postId);
      if (post) {
        post.likeCount += 1;
        post.isLiked = true;
      }
      this.hotPosts = [...this.hotPosts];
    },
    unlikePost(postId: string) {
      const post = this.hotPosts.find((post) => post.id === postId);
      if (post) {
        post.likeCount -= 1;
        post.isLiked = false;
      }
      this.hotPosts = [...this.hotPosts];
    },
  },
});
