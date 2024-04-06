import { useCommentService } from '~/server/services/comment.service';
import type { AuthenticatedUser, UpdateCommentDTO } from '~/types/dtos';

type Body = AuthenticatedUser & UpdateCommentDTO;

export default defineEventHandler(async (event) => {
  const { jwt, content } = await readBody<Body>(event);
  const commentId = getRouterParam(event, 'id');
  if (Number.isNaN(commentId)) {
    return createError({
      message: 'Invalid comment id',
    });
  }
  const service = useCommentService(jwt);
  return await service.update(Number(commentId), content);
});
