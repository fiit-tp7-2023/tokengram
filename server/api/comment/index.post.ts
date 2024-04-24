import { useCommentService } from '~/server/services/comment.service';
import type { AddCommentDTO, NFTAddress } from '~/types/dtos';

type Body = AddCommentDTO & NFTAddress;

export default defineEventHandler(async (event) => {
  const jwt = getHeader(event, 'Authorization')?.split('Bearer ')[1];
  if (!jwt) {
    throw createError({
      message: 'Unauthorized',
    });
  }
  const { content, parentCommentId, address } = await readBody<Body>(event);
  const service = useCommentService(jwt);
  return await service.add(address, content, parentCommentId);
});
