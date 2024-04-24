import { useCommentService } from '~/server/services/comment.service';
import type { UpdateCommentDTO } from '~/types/dtos';

type Body = UpdateCommentDTO;

export default defineEventHandler(async (event) => {
  const jwt = getHeader(event, 'Authorization')?.split('Bearer ')[1];
  if (!jwt) {
    throw createError({
      message: 'Unauthorized',
    });
  }
  const { content } = await readBody<Body>(event);
  const commentId = getRouterParam(event, 'id');
  if (Number.isNaN(commentId)) {
    return createError({
      message: 'Invalid comment id',
    });
  }
  const service = useCommentService(jwt);
  return await service.update(Number(commentId), content);
});
