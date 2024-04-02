import type { ChatMessageResponseDTO } from '~/types/dtos';

export function useChatService(token: string) {
  const getAll = async (chatId: string, pageNumber: number, pageSize: number): Promise<ChatMessageResponseDTO[]> => {
    const params: URLSearchParams = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
    });

    return await useApi<ChatMessageResponseDTO[]>(`chat/${chatId}/messages?${params.toString()}`, token);
  };

  return { getAll };
}
