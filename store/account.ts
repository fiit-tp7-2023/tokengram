type AccountStoreState = {
  account: string | null;
  alias: string | null;
};

export const useAccountStore = defineStore('account', {
  state: (): AccountStoreState => ({
    account: null,
    alias: null,
  }),

  actions: {
    setAccount(account: string | null) {
      this.account = account;
    },
    setAlias(alias: string | null) {
      this.alias = alias;
    },
  },
});
