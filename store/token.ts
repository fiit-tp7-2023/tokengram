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
  getters: {
    getCommentsForPost: (state) => (postNFTAddress: string) => {
      return state.comments.filter((comment) => comment.postNFTAddress === postNFTAddress);
    },
  },
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
    prependComment(comment: CommentDTO) {
      this.comments.unshift(comment);
    },
    incrementCommentCount(postNFTAddress: string) {
      const post = this.hotPosts.find((post) => post.nft.address === postNFTAddress);
      if (post) {
        post.commentCount += 1;
      }
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
