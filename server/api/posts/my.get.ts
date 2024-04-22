import { usePostService } from '~/server/services/post.service';
import type { AuthenticatedUser, PaginationDTO } from '~/types/dtos';

export default defineEventHandler(async (event) => {
  const { jwt } = await readBody<AuthenticatedUser>(event);
  const { pageNumber, pageSize } = getQuery<PaginationDTO>(event);

  const service = usePostService(jwt);
  return await service.getMyPosts(pageNumber, pageSize);
});
