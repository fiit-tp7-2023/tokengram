type AccountStoreState = {
  account: string | null;
};

export const useAccountStore = defineStore('account', {
  state: (): AccountStoreState => ({
    account: null,
  }),

  actions: {
    setAccount(account: string | null) {
      this.account = account;
    },
  },
});
