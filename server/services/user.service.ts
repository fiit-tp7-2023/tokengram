import { useApi } from '../utils/api';
import type { UserResponseDTO } from '~/types/dtos/user';

export function useUserService(token: string) {
  const updateUser = async (fd: FormData): Promise<UserResponseDTO> => {
    const resp = await useApi<UserResponseDTO, FormData>(`users`, token, {
      method: 'PUT',
      body: fd,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return resp;
  };

  return { updateUser };
}
