import { postService } from '~/server/services/post.service';
import { AuthenticatedUser } from '~/types/auth';
import { PaginationDTO } from '~/types/dtos';

export default defineEventHandler(async (event) => {
  const { jwt } = await readBody<AuthenticatedUser>(event);
  const { pageNumber, pageSize } = getQuery<PaginationDTO>(event);

  const { getMyPosts } = postService(jwt);
  return await getMyPosts(pageNumber, pageSize);
});
