import { usePostService } from '~/server/services/post.service';
import type { PaginationDTO } from '~/types/dtos';

type Query = PaginationDTO;

export default defineEventHandler(async (event) => {
  const logger = useLogger('GET::USER_POSTS');
  const { pageNumber, pageSize } = getQuery<Query>(event);
  if (Number.isNaN(Number(pageNumber)) || Number.isNaN(Number(pageSize))) {
    logger.error('Invalid page number or page size', { pageNumber, pageSize });
    throw createError({
      message: 'Invalid page number or page size',
    });
  }
  const userAddress = getRouterParam(event, 'id');
  if (!userAddress) {
    logger.error('Invalid NFT address');
    throw createError({
      message: 'Invalid NFT address',
    });
  }

  const service = usePostService();
  return await service.getUserPosts(userAddress, pageNumber, pageSize);
});
