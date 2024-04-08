import { useUserService } from '~/server/services/user.service';
import type { UserUpdateDTO } from '~/types/dtos/user';

type Body = UserUpdateDTO;

export default defineEventHandler(async (event) => {
  const jwt = getHeader(event, 'Authorization')?.split('Bearer ')[1];
  if (!jwt) {
    throw createError({
      message: 'Unauthorized',
    });
  }
  const { username, profilePicture } = await readBody<Body>(event);
  const service = useUserService(jwt);
  return await service.updateUser(username, profilePicture);
});
