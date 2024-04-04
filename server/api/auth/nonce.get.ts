import { useAuthService } from '~/server/services/auth.service';
import type { GetNonceDTO } from '~/types/dtos';

export default defineEventHandler(async (event) => {
  const { address } = getQuery<GetNonceDTO>(event);
  const service = useAuthService();
  return await service.getNonce(address);
});
