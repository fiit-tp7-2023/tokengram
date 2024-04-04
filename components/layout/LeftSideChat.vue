<template>
  <div class="h-full border-r my-2 border-gray-400 md:p-2">
    <ul class="flex flex-col items-start">
      <li
        class="w-full bg-slate-400 rounded py-2 px-2 hover:bg-slate-300 cursor-pointer my-2 text-center"
        @click="createChat"
      >
        Create new chat
      </li>
      <li v-for="chat in chats" :key="chat.id" class="w-full">
        <chat-row :chat="chat" :selected="isSelected(chat.id)" />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { HubConnectionState } from '@microsoft/signalr';
import ChatRow from '~/components/chat/ChatRow.vue';
import { useAccountStore, useChatStore } from '~/store';

const accountStore = useAccountStore();
const chatStore = useChatStore();

const chats = computed(() => chatStore.chats);

const route = useRoute();

const isSelected = (id: number) => {
  return id === Number(route.params.id);
};

const logger = useLogger('CHAT_HUB::');
const signal = useSignalR();
if (!accountStore.accessToken) {
  throw new Error('No access token');
}
signal.initialize(accountStore.accessToken);
signal.registerHandler('UserJoinedChat', (id, dto) => logger.log(id, dto));

const createChat = async () => {
  const newChat = await signal.createChat([], 'Test chat');
  chatStore.addChat(newChat);
};

onMounted(async () => {
  if (signal.connectionState.value === HubConnectionState.Disconnected) {
    await signal.connect();
  }
  // Load chats
  const dto = await $fetch('/api/chat', {
    headers: {
      Authorization: `Bearer ${accountStore.accessToken}`,
    },
  });
  chatStore.setChats(dto.chats);
  chatStore.setInvitations(dto.receivedChatInvitations);
});
</script>
