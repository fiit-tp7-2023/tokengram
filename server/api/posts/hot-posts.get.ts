import { usePostService } from '~/server/services/post.service';
import type { PaginationDTO } from '~/types/dtos';
import { useLogger } from '~/server/utils/logger';

export default defineEventHandler(async (event) => {
  const jwt = getHeader(event, 'Authorization')?.split('Bearer ')[1];
  const logger = useLogger('POSTS::GET_HOT_POSTS');
  const { pageNumber, pageSize } = getQuery<PaginationDTO>(event);
  if (Number.isNaN(Number(pageNumber)) || Number.isNaN(Number(pageSize))) {
    logger.error('Invalid page number or page size', { pageNumber, pageSize });
    throw createError({
      message: 'Invalid page number or page size',
    });
  }

  const service = usePostService(jwt);
  return await service.getHotPosts(pageNumber, pageSize);
});
