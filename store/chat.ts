import { defineStore } from 'pinia';
import type { ChatMessageResponseDTO, ChatResponseDTO, ReceivedChatInvitationResponseDTO } from '~/types/dtos';

interface ChatStoreState {
  messages: Record<number, ChatMessageResponseDTO[]>; // Saved by chat ID
  chats: ChatResponseDTO[];
  invitations: ReceivedChatInvitationResponseDTO[];
}
export const useChatStore = defineStore({
  id: 'chat',
  state: (): ChatStoreState => ({
    messages: {},
    chats: [],
    invitations: [],
  }),
  actions: {
    setChats(chats: ChatResponseDTO[]) {
      this.chats = chats;
    },
    addChat(chat: ChatResponseDTO) {
      this.chats.push(chat);
    },
    removeChat(chatId: number) {
      this.chats = this.chats.filter((chat) => chat.id !== chatId);
    },
    setInvitations(invitations: ReceivedChatInvitationResponseDTO[]) {
      this.invitations = invitations;
    },
    setMessages(chatId: number, messages: ChatMessageResponseDTO[]) {
      this.messages[chatId] = messages.reverse();
    },
    addMessage(chatId: number, message: ChatMessageResponseDTO) {
      if (!this.messages[chatId]) {
        this.messages[chatId] = [];
      }
      this.messages[chatId].push(message);
    },
    removeInvitation(chatId: number) {
      this.invitations = this.invitations.filter((inv) => inv.chat.id !== chatId);
    },
  },
  getters: {
    getMessages: (state) => (chatId: number) => state.messages[chatId] ?? [],
    getChat: (state) => (chatId: number) => state.chats.find((chat) => chat.id === chatId),
    hasInvitations: (state) => state.invitations.length > 0,
  },
});
