import { useApi } from '../utils/api';
import type { AddCommentDTO, CommentDTO, CommentLikeDTO, UpdateCommentDTO } from '~/types/dtos';

export function useCommentService(token: string) {
  const getAll = async (nftAddress: string, pageNumber: number, pageSize: number): Promise<CommentDTO[]> => {
    const params: URLSearchParams = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
    });

    return await useApi<[]>(`posts/${nftAddress}/comments?${params.toString()}`, token);
  };

  const add = async (nftAddress: string, content: string, parentCommentId: number): Promise<CommentDTO> => {
    const resp = await useApi<CommentDTO, AddCommentDTO>(`posts/${nftAddress}/comments`, token, {
      method: 'POST',
      body: {
        parentCommentId,
        content,
      },
    });
    return resp;
  };

  const update = async (commentId: number, content: string): Promise<CommentDTO> => {
    const resp = await useApi<CommentDTO, UpdateCommentDTO>(`posts/comments/${commentId}`, token, {
      method: 'PUT',
      body: {
        content,
      },
    });
    return resp;
  };

  const remove = async (commentId: number) => {
    const resp = await useApi(`posts/comments/${commentId}`, token, {
      method: 'DELETE',
    });
    return resp;
  };

  const getLikes = async (commentId: number): Promise<CommentLikeDTO[]> => {
    return await useApi<CommentLikeDTO[]>(`posts/comments/${commentId}/likes`, token);
  };

  const like = async (commentId: number): Promise<CommentLikeDTO> => {
    return await useApi<CommentLikeDTO>(`posts/comments/${commentId}/ likes`, token, {
      method: 'POST',
    });
  };

  const unlike = async (commentId: number): Promise<void> => {
    await useApi(`posts/comments/${commentId}/ likes`, token, {
      method: 'DELETE',
    });
  };

  return {
    getAll,
    getLikes,
    like,
    unlike,
    add,
    update,
    remove,
  };
}
