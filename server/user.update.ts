import { useApi } from './utils/api';
import { UpdateUserProfilePictureDTO, UpdateUsernameDTO } from '~/types/user';

export function useProfileService(token?: string) {
  const updateProfilePicture = async (userId: string, picturePath: string): Promise<void> => {
    await useApi<void, UpdateUserProfilePictureDTO>(`users/${userId}/update-profile-picture`, token, {
      method: 'PUT',
      body: {
        picturePath,
      },
    });
  };

  const updateUsername = async (userId: string, username: string): Promise<void> => {
    await useApi<void, UpdateUsernameDTO>(`users/${userId}/update-username`, token, {
      method: 'PUT',
      body: {
        username,
      },
    });
  };

  return {
    updateProfilePicture,
    updateUsername,
  };
}
