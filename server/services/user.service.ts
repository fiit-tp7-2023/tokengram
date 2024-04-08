import { useApi } from '../utils/api';
import type { UserUpdateDTO, UserResponseDTO } from '~/types/dtos/user';

export function useUserService(token: string) {
  const updateUser = async (username: string, profilePicture: string): Promise<UserResponseDTO> => {
    const resp = await useApi<UserResponseDTO, UserUpdateDTO>(`users`, token, {
      method: 'PUT',
      body: {
        username,
        profilePicture,
      },
    });
    return resp;
  };

  return { updateUser };
}
