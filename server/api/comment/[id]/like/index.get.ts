import { useCommentService } from '~/server/services/comment.service';
import type { AuthenticatedUser } from '~/types/dtos';

export default defineEventHandler(async (event) => {
  const { jwt } = await readBody<AuthenticatedUser>(event);
  const commentId = getRouterParam(event, 'id');
  if (Number.isNaN(commentId)) {
    return createError({
      message: 'Invalid comment id',
    });
  }

  const service = useCommentService(jwt);
  return await service.getLikes(Number(commentId));
});
