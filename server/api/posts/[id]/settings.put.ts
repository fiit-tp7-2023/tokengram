import { usePostService } from '~/server/services/post.service';
import { isEmpty } from '~/server/utils/is-empty';
import type { PostUserSettingsRequestDTO } from '~/types/dtos';

export default defineEventHandler(async (event) => {
  const logger = useLogger('POST::UPDATE_POST_SETTINGS');
  const jwt = getHeader(event, 'Authorization')?.split('Bearer ')[1];
  if (!jwt) {
    logger.error('Unauthorized');
    throw createError({
      message: 'Unauthorized',
    });
  }
  const nftAddress = getRouterParam(event, 'id');
  if (!nftAddress) {
    logger.error('Invalid NFT address');
    throw createError({
      message: 'Invalid NFT address',
    });
  }
  const settings = await readBody<PostUserSettingsRequestDTO>(event);
  if (isEmpty(settings?.isVisible)) {
    logger.error('Invalid settings');
    throw createError({
      message: 'Invalid settings',
    });
  }

  const service = usePostService(jwt);
  return await service.updatePostSettings(nftAddress, settings);
});
