import { defineStore } from 'pinia';
import type { ChatMessageResponseDTO, ChatResponseDTO, ReceivedChatInvitationResponseDTO } from '~/types/dtos';

interface ChatStoreState {
  messages: Record<string, ChatMessageResponseDTO[]>;
  chats: Record<string, ChatResponseDTO>;
  invitations: ReceivedChatInvitationResponseDTO[];
}
export const useChatStore = defineStore({
  id: 'chat',
  state: (): ChatStoreState => ({
    messages: {},
    chats: {},
    invitations: [],
  }),
  actions: {
    setMessages(address: string, messages: ChatMessageResponseDTO[]) {
      this.messages[address] = messages;
    },
    setChat(address: string, chat: ChatResponseDTO) {
      this.chats[address] = chat;
    },
    setInvitations(invitations: ReceivedChatInvitationResponseDTO[]) {
      this.invitations = invitations;
    },
    addMessage(address: string, message: ChatMessageResponseDTO) {
      if (!this.messages[address]) {
        this.messages[address] = [];
      }
      this.messages[address].push(message);
    },
    resolveInvitation(from: string) {
      this.invitations = this.invitations.filter((inv) => inv.sender.address !== from);
    },
  },
  getters: {
    getMessages: (state) => (address: string) => state.messages[address] ?? [],
    hasInvitations: (state) => state.invitations.length > 0,
  },
});
