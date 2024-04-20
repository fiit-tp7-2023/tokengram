import { usePostService } from '~/server/services/post.service';
import type { PaginationDTO } from '~/types/dtos';
import { useLogger } from '~/server/utils/logger';

export default defineEventHandler(async (event) => {
  const jwt = getHeader(event, 'Authorization')?.split('Bearer ')[1];
  const logger = useLogger('POSTS::GET_HOT_POSTS');
  if (!jwt) {
    logger.error('Unauthorized');
    throw createError({
      message: 'Unauthorized',
    });
  }
  const { pageNumber, pageSize } = getQuery<PaginationDTO>(event);

  const service = usePostService(jwt);
  return await service.getHotPosts(pageNumber, pageSize);
});
