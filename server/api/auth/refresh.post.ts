import { authService } from '~/server/services/auth.service';
import { AuthenticatedUser, RefreshTokenRequestDTO } from '~/types/auth';

type Body = RefreshTokenRequestDTO & AuthenticatedUser;

export default defineEventHandler(async (event) => {
  const { refreshToken: refToken, jwt } = await readBody<Body>(event);
  const { refreshToken } = authService(jwt);
  return await refreshToken(refToken);
});
