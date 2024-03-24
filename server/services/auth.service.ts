import { useApi } from '../utils/api';
import { GetNonceDTO, RefreshTokenDTO, RefreshTokenRequestDTO, VerifyNonce } from '~/types/auth';

export function useAuthService(token?: string) {
  const getNonce = async (address: string): Promise<string> =>
    await useApi<string, GetNonceDTO>('auth/nonce-message', undefined, {
      method: 'POST',
      body: {
        address,
      },
    });

  const verifyNonce = async (signature: string, address: string): Promise<RefreshTokenDTO> => {
    const response = await useApi<RefreshTokenDTO, VerifyNonce>('auth/login', undefined, {
      method: 'POST',
      body: {
        signature,
        address,
      },
    });
    return response;
  };

  const refreshToken = async (refreshToken: string): Promise<RefreshTokenDTO> => {
    if (!token) {
      throw new Error('Missing user token');
    }
    const response = await useApi<RefreshTokenDTO, RefreshTokenRequestDTO>('auth/refresh', token, {
      method: 'POST',
      body: {
        refreshToken,
      },
    });
    return response;
  };

  return {
    getNonce,
    verifyNonce,
    refreshToken,
  };
}
