import type { UserResponseDTO } from '~/types/dtos';

type UsersStoreState = {
  users: UserResponseDTO[];
};

export const useUsersStore = defineStore('users', {
  persist: true,
  state: (): UsersStoreState => ({
    users: [],
  }),

  actions: {
    setUsers(users: UserResponseDTO[]) {
      this.users = users;
    },
  },

  getters: {
    getUser:
      (state) =>
      (address: string): UserResponseDTO | null =>
        state.users.find((us) => us.address === address) ?? null,
  },
});
