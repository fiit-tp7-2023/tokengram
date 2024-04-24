import { useApi } from '../utils/api';
import type { UserResponseDTO, UserProfileDTO, UserFollowersDTO, UserFollowingDTO } from '~/types/dtos/user';

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
  const getUserProfile = async (userAddress: string): Promise<UserProfileDTO> => {
    return await useApi<UserProfileDTO>(`users/${userAddress}`, token);
  };

  const getFollowers = async (userAddress: string): Promise<UserFollowersDTO> => {
    return await useApi<UserFollowersDTO>(`users/${userAddress}/followers`, token);
  };

  const deleteFollowers = async (userAddress: string): Promise<UserFollowersDTO> => {
    return await useApi<UserFollowersDTO>(`users/followers/${userAddress}`, token, {
      method: 'DELETE',
    });
  };

  const getFollowing = async (userAddress: string): Promise<UserFollowingDTO> => {
    return await useApi<UserFollowingDTO>(`users/${userAddress}/followings`, token);
  };

  const follow = async (userAddress: string): Promise<UserFollowingDTO> => {
    return await useApi<UserFollowingDTO>(`users/followings/${userAddress}`, token, {
      method: 'POST',
    });
  };

  const deleteFollow = async (UserAddress: string): Promise<UserFollowingDTO> => {
    return await useApi<UserFollowingDTO>(`users/followings/${UserAddress}`, token, {
      method: 'DELETE',
    });
  };

  return { updateUser, getUserProfile, getFollowers, deleteFollowers, getFollowing, follow, deleteFollow };
}
