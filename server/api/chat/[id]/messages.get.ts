import { useChatService } from '~/server/services/chat.service';
import type { PaginationDTO } from '~/types/dtos';
import { useLogger } from '~/server/utils/logger';

type Query = PaginationDTO & { chatId: number };

export default defineEventHandler(async (event) => {
  const jwt = getHeader(event, 'Authorization')?.split('Bearer ')[1];
  const logger = useLogger('CHAT::GET_MESSAGES');
  if (!jwt) {
    logger.error('Unauthorized');
    throw createError({
      message: 'Unauthorized',
    });
  }
  const chatId = Number(getRouterParam(event, 'id'));
  if (Number.isNaN(chatId)) {
    logger.error('Invalid chat id', { chatId });
    throw createError({
      message: 'Invalid chat id',
    });
  }
  const { pageNumber, pageSize } = getQuery<Query>(event);
  logger.info('Getting messages', { chatId, pageNumber, pageSize });
  if (Number.isNaN(Number(pageNumber)) || Number.isNaN(Number(pageSize))) {
    logger.error('Invalid page number or page size', { pageNumber, pageSize });
    throw createError({
      message: 'Invalid page number or page size',
    });
  }
  try {
    const service = useChatService(jwt);
    return await service.getMessages(Number(chatId), pageNumber, pageSize);
  } catch (e) {
    logger.error('Failed to get messages', { error: e });
    throw createError({
      message: 'Failed to get messages',
    });
  }
});
