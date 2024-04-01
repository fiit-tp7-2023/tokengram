import { useUserService } from '~/server/services/user.service';
import { AuthenticatedUser } from '~/types/auth';
import { UserUpdateDTO, UserResponseDTO } from '~/types/dtos/user';

type Body = AuthenticatedUser & UserUpdateDTO & UserResponseDTO;

export default defineEventHandler(async (event) => {
  const { jwt, username, profilePicture } = await readBody<Body>(event);
  const service = useUserService(jwt);
  return await service.updateUser(username, profilePicture);
});
