import { usePostService } from '~/server/services/post.service';
import type { AuthenticatedUser } from '~/types/dtos';

export default defineEventHandler(async (event) => {
  const { jwt } = await readBody<AuthenticatedUser>(event);
  const nftAddress = getRouterParam(event, 'id');
  if (!nftAddress) {
    return createError({
      message: 'Invalid NFT address',
    });
  }

  const service = usePostService(jwt);
  return await service.unlike(nftAddress);
});
