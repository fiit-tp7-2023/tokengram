import { useUserService } from '~/server/services/user.service';

export default defineEventHandler(async (event) => {
  const jwt = getHeader(event, 'Authorization')?.split('Bearer ')[1];
  if (!jwt) {
    throw createError({
      message: 'Unauthorized',
    });
  }
  const userAddress = getRouterParam(event, 'id');
  if (!userAddress) {
    throw createError({
      message: 'Invalid NFT address',
    });
  }
  const service = useUserService(jwt);
  return await service.getUserProfile(userAddress);
});
