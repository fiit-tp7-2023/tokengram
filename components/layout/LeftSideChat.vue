<template>
  <div class="h-full border-r my-2 border-gray-400 md:py-2">
    <teleport to="body">
      <create-chat-modal v-if="openedModal" @close="openedModal = false" />
      <error-modal v-if="error" :error="error" @close="error = null" />
    </teleport>
    <ul class="flex flex-col items-start">
      <li v-if="hasInvitations" class="w-full text-xl border-b-2 mb-2">Invitations</li>
      <li
        v-for="invitation in invitations"
        :key="invitation.chat.id"
        class="w-full flex justify-between items-center border-b py-2"
      >
        {{ invitation.chat.name }}
        <span class="flex gap-1">
          <button
            class="bg-blue-300 hover:bg-blue-200 rounded py-2 px-2 w-20"
            @click="acceptInvitation(invitation.chat.id)"
          >
            Accept
          </button>
          <button class="bg-slate-300 rounded py-2 px-2 w-20" @click="rejectInvitation(invitation.chat.id)">
            Reject
          </button>
        </span>
      </li>
      <li class="w-full text-xl border-b-2 mb-2">Chats</li>
      <li class="w-full p-2 flex justify-center items-center">
        <button
          class="w-full rounded p-2 bg-blue-300 hover:bg-blue-200 cursor-pointer flex justify-center items-center"
          @click="createChat"
        >
          New chat
        </button>
      </li>
      <li
        v-for="chat in chats"
        :key="chat.id"
        class="w-full py-2 px-2 border-b flex justify-between gap-2"
        :class="[isSelected(chat.id) ? 'bg-slate-400' : '']"
      >
        <chat-row :chat="chat" :selected="isSelected(chat.id)" />

        <button class="bg-slate-300 hover:bg-slate-200 rounded py-1 px-1 w-10" @click="leaveChat(chat.id)">
          <Icon name="mdi:chat-remove-outline" />
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { HubConnectionState } from '@microsoft/signalr';

import ChatRow from '~/components/chat/ChatRow.vue';
import CreateChatModal from '~/components/chat/CreateChatModal.vue';

import { useAccountStore, useChatStore } from '~/store';

const accountStore = useAccountStore();
const chatStore = useChatStore();

const chats = computed(() => chatStore.chats);

const invitations = computed(() => chatStore.invitations);

const hasInvitations = computed(() => invitations.value.length > 0);

const route = useRoute();

const error = ref<Error | null>(null);

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

const acceptInvitation = async (id: number) => {
  try {
    const newChat = await signal.respondToChatInvitation(id, true);
    if (newChat) {
      chatStore.addChat(newChat);
      chatStore.removeInvitation(id);
    }
  } catch (e) {
    error.value = e as Error;
  }
};

const rejectInvitation = async (id: number) => {
  try {
    await signal.respondToChatInvitation(id, false);
    chatStore.removeInvitation(id);
  } catch (e) {
    error.value = e as Error;
  }
};

const openedModal = ref(false);
const createChat = () => {
  openedModal.value = true;
};

const leaveChat = async (id: number) => {
  try {
    await signal.leaveChat(id);
    chatStore.removeChat(id);
  } catch (e) {
    error.value = e as Error;
  }
};

onMounted(async () => {
  // Load chats
  const dto = await $fetch('/api/chat', {
    headers: {
      Authorization: `Bearer ${accountStore.accessToken}`,
    },
  });
  chatStore.setChats(dto.chats);
  chatStore.setInvitations(dto.receivedChatInvitations);
  if (signal.connectionState.value === HubConnectionState.Disconnected) {
    try {
      await signal.connect();

      addEventListener('focus', async () => {
        if (signal.connectionState.value === HubConnectionState.Disconnected) {
          await signal.connect();
        }
      });

      addEventListener('blur', async () => {
        if (signal.connectionState.value === HubConnectionState.Connected) {
          await signal.disconnect();
        }
      });
    } catch (e) {
      error.value = e as Error;
    }
  }
});
</script>
