import { defineStore } from 'pinia';
import type { UserProfileDTO } from '../types/dtos/user';

type UserProfileState = UserProfileDTO;

export const useUserProfileStore = defineStore('userProfile', {
  persist: true,
  state: (): UserProfileState => ({
    address: '',
    username: '',
    profilePicture: '',
    isFollower: false,
    isFollowed: false,
    postCount: 0,
    followerCount: 0,
    followingCount: 0,
  }),

  actions: {
    setProfile(data: Partial<UserProfileState>) {
      if (data.address !== undefined) this.address = data.address;
      if (data.username !== undefined) this.username = data.username;
      if (data.profilePicture !== undefined) this.profilePicture = data.profilePicture;
      if (data.isFollower !== undefined) this.isFollower = data.isFollower;
      if (data.isFollowed !== undefined) this.isFollowed = data.isFollowed;
      if (data.postCount !== undefined) this.postCount = data.postCount;
      if (data.followerCount !== undefined) this.followerCount = data.followerCount;
      if (data.followingCount !== undefined) this.followingCount = data.followingCount;
    },
  },
});
