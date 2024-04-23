import { useApi } from '../utils/api';
import type {
  LikePostResponseDTO,
  NFTPost,
  PostLikeDTO,
  PostResponseDTO,
  PostUserSettingsRequestDTO,
} from '~/types/dtos';

export function usePostService(token: string) {
  const getMyPosts = async (pageNumber: number, pageSize: number): Promise<PostResponseDTO[]> => {
    const params: URLSearchParams = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
    });

    return await useApi(`posts/user?${params.toString()}`, token);
  };

  const updatePostSettings = async (
    nftAddress: string,
    settings: PostUserSettingsRequestDTO,
  ): Promise<PostResponseDTO> => {
    return await useApi(`posts/${nftAddress}/settings`, token, {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  };

  const getLikes = async (nftAddress: string): Promise<PostLikeDTO[]> => {
    return await useApi<PostLikeDTO[]>(`posts/${nftAddress}/likes}`, token);
  };

  const like = async (nftAddress: string): Promise<LikePostResponseDTO> => {
    const resp = await useApi<LikePostResponseDTO>(`posts/${nftAddress}/likes`, token, {
      method: 'POST',
    });
    return resp;
  };

  const unlike = async (nftAddress: string): Promise<LikePostResponseDTO> => {
    const resp = await useApi<LikePostResponseDTO>(`posts/${nftAddress}/likes`, token, {
      method: 'DELETE',
    });
    return resp;
  };

  const getHotPosts = async (pageNumber: number, pageSize: number): Promise<NFTPost[]> => {
    const params: URLSearchParams = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
    });

    return await useApi<NFTPost[]>(`posts/hot?${params.toString()}`, token);
  };

  return { getMyPosts, like, unlike, getLikes, getHotPosts, updatePostSettings };
}
