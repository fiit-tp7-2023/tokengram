import { authService } from '~/server/services/auth.service';
import { VerifyNonce } from '~/types/auth';

export default defineEventHandler(async (event) => {
  const { verifyNonce } = authService();
  const { signature, address } = await readBody<VerifyNonce>(event);
  return await verifyNonce(signature, address);
});
