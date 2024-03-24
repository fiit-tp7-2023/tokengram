import { authService } from '~/server/services/auth.service';
import { GetNonceDTO } from '~/types/auth';

export default defineEventHandler(async (event) => {
  const { address } = await readBody<GetNonceDTO>(event);
  const { getNonce } = authService();
  return await getNonce(address);
});
