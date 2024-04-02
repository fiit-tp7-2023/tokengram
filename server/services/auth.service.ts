import { useApi } from '../utils/api';
import { useLogger } from '~/composables/logger';
import type { NonceMessageDTO, TokensResponseDTO, RefreshTokenRequestDTO, VerifyNonce } from '~/types/dtos';

export function useAuthService(token?: string) {
  const logger = useLogger('auth_service::');
  const getNonce = async (address: string): Promise<string> => {
    const query = new URLSearchParams({ address });
    try {
      const { message } = await useApi<NonceMessageDTO>(`auth/nonce-message?${query.toString()}`);
      return message;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  };

  const verifyNonce = async (signature: string, address: string): Promise<TokensResponseDTO> => {
    try {
      logger.info('Verifying nonce', { signature, address });
      return await useApi<TokensResponseDTO, VerifyNonce>('auth/login', undefined, {
        method: 'POST',
        body: {
          signature,
          address,
        },
      });
    } catch (e) {
      logger.error(e);
      throw e;
    }
  };

  const refreshToken = async (refreshToken: string): Promise<TokensResponseDTO> => {
    if (!token) {
      logger.error('Missing user token');
      throw new Error('Missing user token');
    }
    try {
      return await useApi<TokensResponseDTO, RefreshTokenRequestDTO>('auth/refresh', token, {
        method: 'POST',
        body: {
          refreshToken,
        },
      });
    } catch (e) {
      logger.error(e);
      throw e;
    }
  };

  return {
    getNonce,
    verifyNonce,
    refreshToken,
  };
}
