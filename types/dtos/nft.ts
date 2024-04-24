export interface Attribute {
  traitType: string;
  value: string;
}

export interface Tag {
  type: string;
  value: number;
}

export interface NFTNode {
  address: string;
  name?: string;
  uri?: string;
  description?: string;
  attributes?: Attribute[];
  image?: string;
  externalUrl?: string;
  animationUrl?: string;
  tokenId: string;
  createdAtBlock: number;
  raw?: string;
  tags?: Tag[];
  nftVector?: string;
}

export interface NFTPost {
  id: string;
  nft: NFTNode;
  description: string;
  owner: {
    username?: string;
    address: string;
    profileImg?: string;
  };
  likes: {
    username: string;
    address: string;
  }[];
  comments: {
    username: string;
    address: string;
    text: string;
  }[];
}

export interface NFTAddress {
  address: string;
}

export interface CommentDTO {
  id: number;
  content: string;
  commenterAddress: string;
  postNFTAddress: string;
  parentCommentId: number;
  commentReplyCount: number;
  likeCount: number;
  createdAt: string;
}

export interface AddCommentDTO {
  content: string;
  parentCommentId: number;
}

export interface UpdateCommentDTO {
  content: string;
}

export interface LikePostResponseDTO {
  id: number;
  likerAddress: string;
  postNFTAddress: string;
}

export interface CommentLikeDTO {
  id: number;
  liker: {
    address: string;
    username: string;
  };
  commentId: number;
}

export interface PostLikeDTO {
  id: number;
  liker: {
    address: string;
    username: string;
  };
  postNFTAddress: string;
}

export interface UserPostResponseDTO {
  id: string;
  ownerAddress: string;
  nft: NFTNode;
  description?: string;
  commentCount: number;
  likeCount: number;
  isVisible: boolean;
  isLiked: boolean;
  createdAt: string;
}

export interface PostUserSettingsRequestDTO {
  isVisible: boolean;
  description?: string;
}
