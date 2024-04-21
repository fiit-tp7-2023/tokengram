type AccountStoreState = {
  address: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  username: string | null;
};

export const useAccountStore = defineStore('account', {
  persist: true,
  state: (): AccountStoreState => ({
    address: null,
    username: null,
    accessToken: null,
    refreshToken: null,
  }),

  actions: {
    setAddress(address: string | null) {
      this.address = address;
    },
    setUsername(username: string | null) {
      this.username = username;
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
