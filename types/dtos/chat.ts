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
  parentMessageId: number;
  sender: UserResponseDTO;
  createdAt: string;
}

export interface ChatInvitationResponseDTO {
  user: UserResponseDTO;
  sender: UserResponseDTO;
}

export interface ReceivedChatInvitationResponseDTO {
  chat: BasicChatResponseDTO;
  sender: UserResponseDTO;
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
