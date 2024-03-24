import { useApi } from '../utils/api';
import { AddCommentDTO, CommentDTO, UpdateCommentDTO } from '~/types/dtos';

export function commentService(token: string) {
  const getAll = async (nftAddress: string, pageNumber: number, pageSize: number): Promise<CommentDTO[]> => {
    const params: URLSearchParams = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
    });

    return await useApi<CommentDTO[]>(`post/${nftAddress}/comments?${params.toString()}`, token);
  };

  const add = async (nftAddress: string, content: string, parentCommentId: number): Promise<CommentDTO> => {
    const resp = await useApi<CommentDTO, AddCommentDTO>(`post/${nftAddress}/comments`, token, {
      method: 'POST',
      body: {
        parentCommentId,
        content,
      },
    });
    return resp;
  };

  const update = async (commentId: number, content: string): Promise<CommentDTO> => {
    const resp = await useApi<CommentDTO, UpdateCommentDTO>(`post/comments/${commentId}`, token, {
      method: 'PUT',
      body: {
        content,
      },
    });
    return resp;
  };

  const remove = async (commentId: number) => {
    const resp = await useApi(`post/comments/${commentId}`, token, {
      method: 'DELETE',
    });
    return resp;
  };

  return {
    getAll,
    add,
    update,
    remove,
  };
}
