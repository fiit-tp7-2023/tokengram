import { useApi } from '../utils/api';
import { AddCommentDTO, CommentDTO, LikePostResponseDTO, NFTPost, UpdateCommentDTO } from '~/types/dtos';

export function postService(token: string) {
  const getMyPosts = async (pageNumber: number, pageSize: number): Promise<NFTPost[]> => {
    const params: URLSearchParams = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
    });

    return await useApi<NFTPost[]>(`post/my?${params.toString()}`, token);
  };

  const getNftComments = async (nftAddress: string, pageNumber: number, pageSize: number): Promise<CommentDTO[]> => {
    const params: URLSearchParams = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
    });

    return await useApi<CommentDTO[]>(`post/${nftAddress}/comments?${params.toString()}`, token);
  };

  const addComment = async (nftAddress: string, content: string, parentCommentId: number): Promise<CommentDTO> => {
    const resp = await useApi<CommentDTO, AddCommentDTO>(`post/${nftAddress}/comments`, token, {
      method: 'POST',
      body: {
        parentCommentId,
        content,
      },
    });
    return resp;
  };

  const updateComment = async (commentId: number, content: string): Promise<CommentDTO> => {
    const resp = await useApi<CommentDTO, UpdateCommentDTO>(`post/comments/${commentId}`, token, {
      method: 'PUT',
      body: {
        content,
      },
    });
    return resp;
  };

  const deleteComment = async (commentId: number) => {
    const resp = await useApi(`post/comments/${commentId}`, token, {
      method: 'DELETE',
    });
    return resp;
  };

  const likePost = async (nftAddress: string): Promise<LikePostResponseDTO> => {
    const resp = await useApi<LikePostResponseDTO>(`post/${nftAddress}/likes`, token, {
      method: 'POST',
    });
    return resp;
  };

  return { getMyPosts, addComment, getNftComments, updateComment, deleteComment, likePost };
}
