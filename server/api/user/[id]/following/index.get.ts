import { useUserService } from '~/server/services/user.service';

export default defineEventHandler(async (event) => {
  const jwt = getHeader(event, 'Authorization')?.split('Bearer ')[1];
  const nftAddress = getRouterParam(event, 'id');
  if (!jwt) {
    throw createError({
      message: 'Unauthorized',
    });
  }
  if (!nftAddress) {
    throw createError({
      message: 'Invalid NFT address',
    });
  }
  const service = useUserService(jwt);
  return await service.getFollowing(nftAddress);
});
