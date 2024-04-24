import { usePostService } from '~/server/services/post.service';

export default defineEventHandler(async (event) => {
  const jwt = getHeader(event, 'Authorization')?.split('Bearer ')[1];
  if (!jwt) {
    throw createError({
      message: 'Unauthorized',
    });
  }
  const nftAddress = getRouterParam(event, 'id');
  if (!nftAddress) {
    return createError({
      message: 'Invalid NFT address',
    });
  }

  const service = usePostService(jwt);
  return await service.like(nftAddress);
});
