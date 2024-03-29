import { defineStore } from 'pinia';
import type { Message } from '~/types/dtos';

interface ChatStoreState {
  messages: Record<string, Message[]>;
}
export const useChatStore = defineStore({
  id: 'chat',
  state: (): ChatStoreState => ({
    messages: {},
  }),
  actions: {
    setMessages(address: string, messages: Message[]) {
      this.messages[address] = messages;
    },
    addMessage(address: string, message: Message) {
      if (!this.messages[address]) {
        this.messages[address] = [];
      }
      this.messages[address].push(message);
    },
  },
  getters: {
    getMessages: (state) => (address: string) => state.messages[address] ?? [],
  },
});
