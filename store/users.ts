import type { User } from '~/types/dtos';

type UsersStoreState = {
  users: User[];
};

export const useUsersStore = defineStore('users', {
  persist: true,
  state: (): UsersStoreState => ({
    users: [],
  }),

  actions: {
    setUsers(users: User[]) {
      this.users = users;
    },
  },

  getters: {
    getUser:
      (state) =>
      (address: string): User | null =>
        state.users.find((us) => us.address === address) ?? null,
  },
});
