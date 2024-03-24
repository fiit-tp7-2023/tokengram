import { useApi } from '../utils/api';
import { LikePostResponseDTO, NFTPost, PostLikeDTO } from '~/types/dtos';

export function usePostService(token: string) {
  const getMyPosts = async (pageNumber: number, pageSize: number): Promise<NFTPost[]> => {
    const params: URLSearchParams = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
    });

    return await useApi<NFTPost[]>(`post/my?${params.toString()}`, token);
  };

  const getLikes = async (nftAddress: string): Promise<PostLikeDTO[]> => {
    return await useApi<PostLikeDTO[]>(`post/${nftAddress}/likes}`, token);
  };

  const like = async (nftAddress: string): Promise<LikePostResponseDTO> => {
    const resp = await useApi<LikePostResponseDTO>(`post/${nftAddress}/likes`, token, {
      method: 'POST',
    });
    return resp;
  };

  const unlike = async (nftAddress: string): Promise<LikePostResponseDTO> => {
    const resp = await useApi<LikePostResponseDTO>(`post/${nftAddress}/likes`, token, {
      method: 'DELETE',
    });
    return resp;
  };

  return { getMyPosts, like, unlike, getLikes };
}
