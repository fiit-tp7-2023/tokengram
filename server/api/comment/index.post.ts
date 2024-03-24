import { commentService } from '~/server/services/comment.service';
import { AuthenticatedUser } from '~/types/auth';
import { AddCommentDTO, NFTAddress } from '~/types/dtos';

type Body = AuthenticatedUser & AddCommentDTO & NFTAddress;

export default defineEventHandler(async (event) => {
  const { jwt, content, parentCommentId, address } = await readBody<Body>(event);
  const service = commentService(jwt);
  return await service.add(address, content, parentCommentId);
});
