type AccountStoreState = {
  address: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  username: string | null;
  profilePicture: string | null;
};

export const useAccountStore = defineStore('account', {
  persist: true,
  state: (): AccountStoreState => ({
    address: null,
    username: null,
    profilePicture: null,
    accessToken: null,
    refreshToken: null,
  }),

  actions: {
    setAddress(address: string | null) {
      this.address = address?.toLowerCase() ?? null;
    },
    setUsername(username: string | null) {
      this.username = username;
    },
    setProfilePicture(profilePicture: string | null) {
      this.profilePicture = profilePicture;
    },
    setToken(accessToken: string | null, refreshToken: string | null) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    },
    disconnect() {
      this.$reset();
    },
  },

  getters: {
    isLogged: (state) => !!state.accessToken,
  },
});
