import { defineStore } from 'pinia';
import type {
  ChatInvitationResponseDTO,
  ChatMessageResponseDTO,
  ChatResponseDTO,
  ReceivedChatInvitationResponseDTO,
  UserChatProfileResponseDTO,
  UserResponseDTO,
} from '~/types/dtos';

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
      if (this.messages[chatId]) {
        delete this.messages[chatId];
      }
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
    addInvitation(invitation: ReceivedChatInvitationResponseDTO) {
      this.invitations.push(invitation);
    },
    addChatUser(chatId: number, user: UserResponseDTO) {
      this.chats.find((chat) => chat.id === chatId)?.users.push(user);
    },
    removeChatUser(chatId: number, userAddress: string) {
      const chat = this.chats.find((chat) => chat.id === chatId);
      if (chat) {
        chat.users = chat.users.filter((chatUser) => chatUser.address !== userAddress);
      }
    },
    removeChatUserInvitation(chatId: number, userAddress: string) {
      const chat = this.chats.find((chat) => chat.id === chatId);
      if (chat) {
        chat.chatInvitations = chat.chatInvitations.filter((invitation) => invitation.user.address !== userAddress);
      }
    },
    removeMessage(chatId: number, messageId: number) {
      if (!this.messages[chatId]) {
        this.messages[chatId] = [];
        return;
      }
      this.messages[chatId] = this.messages[chatId].filter((message) => message.id !== messageId);
    },
    addChatUserInvitation(chatId: number, invitation: ChatInvitationResponseDTO) {
      this.chats.find((chat) => chat.id === chatId)?.chatInvitations.push(invitation);
    },
    updateAdmin(chatId: number, admin: UserResponseDTO) {
      const chat = this.chats.find((chat) => chat.id === chatId);
      if (chat) {
        chat.admin = admin;
      }
    },
    updateChatProfile(profile: UserChatProfileResponseDTO) {
      this.invitations = profile.receivedChatInvitations;
      this.chats = profile.chats;
    },
  },
  getters: {
    getMessages: (state) => (chatId: number) => state.messages[chatId] ?? [],
    getChat: (state) => (chatId: number) => state.chats.find((chat) => chat.id === chatId),
    hasInvitations: (state) => state.invitations.length > 0,
  },
});
