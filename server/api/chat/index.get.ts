import { useChatService } from '~/server/services/chat.service';
import { AuthenticatedUser, PaginationDTO } from '~/types/dtos';

export default defineEventHandler(async (event) => {
  const { jwt } = await readBody<AuthenticatedUser>(event);
  const { pageNumber, pageSize } = getQuery<PaginationDTO>(event);

  const service = useChatService(jwt);
  return await service.getAll(pageNumber, pageSize);
});
