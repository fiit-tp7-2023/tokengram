import { defineStore } from 'pinia';
import type { UserProfileDTO } from '~/types/dtos';

type UserProfileStoreState = {
  profile: UserProfileDTO | null;
};

export const useUserProfileStore = defineStore('userProfile', {
  persist: true,
  state: (): UserProfileStoreState => ({
    profile: null,
  }),

  actions: {
    setProfile(profile: UserProfileDTO) {
      this.profile = profile;
    },
    clearProfile() {
      this.profile = null;
    },
  },

  getters: {
    isOwnProfile:
      (state) =>
      (address: string): boolean => {
        return state.profile?.address === address;
      },
    profileData: (state) => state.profile,
  },
});
