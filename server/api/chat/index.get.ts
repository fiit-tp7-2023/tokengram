import { useChatService } from '~/server/services/chat.service';
import type { PaginationDTO } from '~/types/dtos';

export default defineEventHandler(async (event) => {
  const jwt = getHeader(event, 'Authorization')?.split('Bearer ')[1];
  if (!jwt) {
    throw createError({
      message: 'Unauthorized',
    });
  }
  const { pageNumber, pageSize } = getQuery<PaginationDTO>(event);
  try {
    const service = useChatService(jwt);
    return await service.getAll(pageNumber, pageSize);
  } catch (e) {
    throw createError({
      message: 'Failed to get messages',
    });
  }
});
