import { usePostService } from '~/server/services/post.service';
import type { PaginationDTO } from '~/types/dtos';

type Query = PaginationDTO;
export default defineEventHandler(async (event) => {
  const logger = useLogger('POST::GET_HOT_POSTS');
  const jwt = getHeader(event, 'Authorization')?.split('Bearer ')[1];
  if (!jwt) {
    logger.error('Unauthorized');
    throw createError({
      message: 'Unauthorized',
    });
  }
  const { pageNumber, pageSize } = getQuery<Query>(event);
  logger.info('Getting hot posts', { pageNumber, pageSize });
  if (Number.isNaN(Number(pageNumber)) || Number.isNaN(Number(pageSize))) {
    logger.error('Invalid page number or page size', { pageNumber, pageSize });
    throw createError({
      message: 'Invalid page number or page size',
    });
  }
  const service = usePostService(jwt);
  return await service.getHotPosts(Number(pageNumber), Number(pageSize));
});
