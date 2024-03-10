export {};

declare global {
  interface Window {
    ethereum?: import('web3').providers.Eip1193Provider;
  }
}

export interface Attribute {
  traitType: string;
  value: string;
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
  tags?: string[];
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
