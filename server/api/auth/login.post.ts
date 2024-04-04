import { useAuthService } from '~/server/services/auth.service';
import type { VerifyNonce } from '~/types/dtos';

export default defineEventHandler(async (event) => {
  const { signature, address } = await readBody<VerifyNonce>(event);
  const service = useAuthService();
  return await service.verifyNonce(signature, address);
});
