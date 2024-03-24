import { useCommentService } from '~/server/services/comment.service';
import { AuthenticatedUser } from '~/types/auth';

export default defineEventHandler(async (event) => {
  const { jwt } = await readBody<AuthenticatedUser>(event);
  const commentId = getRouterParam(event, 'id');
  if (Number.isNaN(commentId)) {
    return createError({
      message: 'Invalid comment id',
    });
  }

  const service = useCommentService(jwt);
  return await service.unlike(Number(commentId));
});
