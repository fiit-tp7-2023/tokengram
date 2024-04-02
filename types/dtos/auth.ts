export interface AuthenticatedUser {
  jwt: string;
}

export interface GetNonceDTO {
  address: string;
}

export interface NonceMessageDTO {
  message: string;
}

export interface VerifyNonce {
  signature: string;
  address: string;
}

export interface TokensResponseDTO {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequestDTO {
  refreshToken: string;
}
