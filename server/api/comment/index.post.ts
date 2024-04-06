import { useCommentService } from '~/server/services/comment.service';
import type { AddCommentDTO, AuthenticatedUser, NFTAddress } from '~/types/dtos';

type Body = AuthenticatedUser & AddCommentDTO & NFTAddress;

export default defineEventHandler(async (event) => {
  const { jwt, content, parentCommentId, address } = await readBody<Body>(event);
  const service = useCommentService(jwt);
  return await service.add(address, content, parentCommentId);
});
