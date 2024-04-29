export interface UserUpdateDTO {
  Username: string;
  profilePicture: string;
}

export interface UserResponseDTO {
  address: string;
  username?: string;
  profilePicture?: string;
}

export interface UserProfileDTO {
  address: string;
  username?: string;
  profilePicture?: string;
  isFollower: boolean;
  isFollowed: boolean;
  postCount: number;
  followerCount: number;
  followingCount: number;
}

export interface UserFollowersDTO {
  followerUserAddress: string;
  follower: {
    address: string;
    username?: string;
    profilePicture?: string;
  };
  followingSince: string;
}

export interface UserFollowingDTO {
  followerAddress: string;
  followedUser: {
    address: string;
    username?: string;
    profilePicture?: string;
  };
  followingSince: string;
}
