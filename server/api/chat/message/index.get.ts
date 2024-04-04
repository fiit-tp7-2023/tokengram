import { useChatService } from '~/server/services/chat.service';
import { AuthenticatedUser, PaginationDTO } from '~/types/dtos';

type Query = PaginationDTO & { chatId: number };

export default defineEventHandler(async (event) => {
  const { jwt } = await readBody<AuthenticatedUser>(event);
  const { pageNumber, pageSize, chatId } = getQuery<Query>(event);

  const service = useChatService(jwt);
  return await service.getMessages(chatId, pageNumber, pageSize);
});
