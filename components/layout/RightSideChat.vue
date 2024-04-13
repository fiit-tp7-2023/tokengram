<template>
  <aside class="right-nav" :class="[expanded ? 'right-nav-expanded' : 'right-nav-collapsed']">
    <teleport to="body">
      <create-chat-modal v-if="openedModal" @close="openedModal = false" />
      <error-modal v-if="error" :error="error" @close="error = null" />
    </teleport>
    <span
      class="text-white py-2 flex gap-2"
      :class="{ 'w-full px-2 border-b border-pink-500': expanded }"
      @click="expanded = !expanded"
    >
      <icon size="24" name="mdi:message-outline" />
      <span v-if="expanded" class="label">Collapse chats</span>
    </span>
    <ul v-if="expanded" id="side-items" :class="{ 'items-start': expanded, 'items-center': !expanded }">
      <li v-if="hasInvitations" class="side-item text-xl border-b border-pink-500">Invitations</li>
      <li v-for="invitation in invitations" :key="invitation.chat.id" class="side-item">
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
      <li class="side-item text-2xl pb-2 border-b border-pink-500">Chats</li>
      <li class="side-item">
        <button
          class="w-full flex justify-center items-center rounded p-2 bg-pink-500 hover:bg-pink-400 cursor-pointer"
          @click="createChat"
        >
          New chat
        </button>
      </li>
      <li v-for="chat in chats" :key="chat.id" class="side-item">
        <chat-row :chat="chat" :selected="isSelected(chat.id)" />

        <button class="text-pink-500 flex items-center justify-center rounded w-20 h-10" @click="leaveChat(chat.id)">
          <Icon name="mdi:chat-remove-outline" />
        </button>
      </li>
    </ul>
  </aside>
</template>
<script setup lang="ts">
import { HubConnectionState } from '@microsoft/signalr';

import ChatRow from '~/components/chat/ChatRow.vue';
import CreateChatModal from '~/components/chat/CreateChatModal.vue';

import { useAccountStore, useChatStore } from '~/store';

const expanded = ref(true);

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
<style scoped>
.right-nav {
  @apply flex flex-col w-full p-4 h-full items-center bg-slate-900;

  #side-items {
    @apply w-full flex flex-col  gap-4;
  }

  .side-item {
    @apply w-full flex justify-start items-center gap-2 text-white;
  }

  &.right-nav-expanded {
    @apply w-80;
  }

  &.right-nav-collapsed {
    @apply w-16;
  }
}
</style>
