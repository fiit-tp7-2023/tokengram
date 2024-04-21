import { useUserService } from '~/server/services/user.service';

export default defineEventHandler(async (event) => {
  const jwt = getHeader(event, 'Authorization')?.split('Bearer ')[1];
  if (!jwt) {
    throw createError({
      message: 'Unauthorized',
    });
  }
  const fd = await readFormData(event);
  const service = useUserService(jwt);
  return await service.updateUser(fd);
});
