import type { UserResponseDTO } from '.';

export enum ChatTypeEnum {
  PRIVATE = 1,
  GROUP = 2,
}

export interface BasicChatResponseDTO {
  id: number;
  name?: string;
  admin: UserResponseDTO;
  type: ChatTypeEnum;
  users: UserResponseDTO[];
}

export interface ChatMessageResponseDTO {
  id: number;
  content: string;
  chatId: number;
  parentMessageId?: number;
  sender: UserResponseDTO;
  createdAt: string;
}

export interface ChatInvitationRequestDTO {
  chatId: number;
  userAddress: string;
}

export interface ChatInvitationResponseDTO {
  user: UserResponseDTO;
  sender: UserResponseDTO;
}

export interface ChatInvitationResponseRequestDTO {
  chatId: number;
  accept: boolean;
}

export interface ReceivedChatInvitationResponseDTO {
  chat: BasicChatResponseDTO;
  sender: UserResponseDTO;
}

export interface ChatLeaveRequestDTO {
  chatId: number;
}

export interface ChatMessageRequestDTO {
  content: string;
  parentMessageId?: number;
}

export interface ChatRequestDTO {
  userAddresses: string[];
  name?: string;
}

export interface ChatPromoteToAdminRequestDTO {
  chatId: number;
  adminAddress: string;
}

export interface ChatMessageDeleteRequestDTO {
  chatMessageId: number;
}

export interface ChatResponseDTO {
  id: number;
  name?: string;
  lastChatMessage?: ChatMessageResponseDTO;
  admin: UserResponseDTO;
  type: ChatTypeEnum;
  users: UserResponseDTO[];
  chatInvitations: ChatInvitationResponseDTO[];
}

export interface UserChatProfileResponseDTO {
  chats: ChatResponseDTO[];
  receivedChatInvitations: ReceivedChatInvitationResponseDTO[];
}
