import { useApi } from '../utils/api';
import { UserUpdateDTO, UserResponseDTO } from '~/types/dtos/user';

export function useUserService(token: string) {
  const updateUser = async (username: string, profilePicture: string): Promise<UserResponseDTO> => {
    const resp = await useApi<UserResponseDTO, UserUpdateDTO>(`user`, token, {
      method: 'PUT',
      body: {
        Username: username,
        ProfilePicture: profilePicture,
      },
    });
    return resp;
  };

  return { updateUser };
}
