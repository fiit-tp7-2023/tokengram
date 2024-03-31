import { useAuthService } from '~/server/services/auth.service';
import { GetNonceDTO } from '~/types/auth';

export default defineEventHandler(async (event) => {
  const { address } = getQuery<GetNonceDTO>(event);
  const service = useAuthService();
  return await service.getNonce(address);
});
