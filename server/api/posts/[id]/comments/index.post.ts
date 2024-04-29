import { useCommentService } from '~/server/services/comment.service';
import type { CommentDTO } from '~/types/dtos';

export default defineEventHandler(async (event) => {
  const jwt = getHeader(event, 'Authorization')?.split('Bearer ')[1];

  if (!jwt) {
    throw createError({
      message: 'Unauthorized',
    });
  }
  const { content, parrentCommentId } = await readBody<{ content: string; parrentCommentId: number }>(event);
  const nftAddress = getRouterParam(event, 'id');
  if (!nftAddress) {
    throw createError({
      message: 'Invalid NFT address',
    });
  }
  if (!content) {
    throw createError({
      message: 'Invalid content',
    });
  }
  const service = useCommentService(jwt);
  return (await service.add(nftAddress, content, parrentCommentId)) as CommentDTO;
});
