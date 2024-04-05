import type { ChatMessageResponseDTO, UserChatProfileResponseDTO } from '~/types/dtos';

export function useChatService(token: string) {
  const getMessages = async (
    chatId: number,
    pageNumber: number,
    pageSize: number,
  ): Promise<ChatMessageResponseDTO[]> => {
    const params: URLSearchParams = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
    });

    return await useApi<ChatMessageResponseDTO[]>(`chat/${chatId}/messages?${params.toString()}`, token);
  };

  const getAll = async (pageNumber: number, pageSize: number): Promise<UserChatProfileResponseDTO> => {
    const params: URLSearchParams = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
    });

    return await useApi<UserChatProfileResponseDTO>(`chats?${params.toString()}`, token);
  };

  return { getMessages, getAll };
}
