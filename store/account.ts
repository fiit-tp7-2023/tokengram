type AccountStoreState = {
  account: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  alias: string | null;
};

export const useAccountStore = defineStore('account', {
  state: (): AccountStoreState => ({
    account: null,
    alias: null,
    accessToken: null,
    refreshToken: null,
  }),

  actions: {
    setAccount(account: string | null) {
      this.account = account;
    },
    setAlias(alias: string | null) {
      this.alias = alias;
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
