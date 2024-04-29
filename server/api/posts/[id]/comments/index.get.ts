import { useCommentService } from '~/server/services/comment.service';
import type { PaginationDTO } from '~/types/dtos';

export default defineEventHandler(async (event) => {
  const logger = useLogger('COMMENTS::GET_COMMENTS');
  const jwt = getHeader(event, 'Authorization')?.split('Bearer ')[1];
  if (!jwt) {
    throw createError({
      message: 'Unauthorized',
    });
  }
  const nftAddress = getRouterParam(event, 'id');
  if (!nftAddress) {
    logger.error('Invalid NFT address', { nftAddress });
    throw createError({
      message: 'Invalid NFT address',
    });
  }

  const { pageNumber, pageSize } = getQuery<PaginationDTO>(event);
  if (Number.isNaN(Number(pageNumber)) || Number.isNaN(Number(pageSize))) {
    logger.error('Invalid page number or page size', { pageNumber, pageSize });
    throw createError({
      message: 'Invalid page number or page size',
    });
  }

  const service = useCommentService(jwt);
  return await service.getAll(nftAddress, pageNumber, pageSize);
});
