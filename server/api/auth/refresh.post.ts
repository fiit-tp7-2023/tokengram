import { useAuthService } from '~/server/services/auth.service';
import { AuthenticatedUser, RefreshTokenRequestDTO } from '~/types/auth';

type Body = RefreshTokenRequestDTO & AuthenticatedUser;

export default defineEventHandler(async (event) => {
  const { refreshToken: refToken, jwt } = await readBody<Body>(event);
  const service = useAuthService(jwt);
  return await service.refreshToken(refToken);
});
