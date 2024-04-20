<template>
  <teleport to="body">
    <error-modal v-if="error" :error="error" @close="error = null" />
  </teleport>
  <template v-if="chat">
    <chat-header :chat="chat" />
    <invite-to-chat v-if="isChatAdmin" />
    <div id="chat" class="w-full flex flex-col justify-end gap-2">
      <button
        v-if="canLoadMore"
        class="flex w-full text-pink-500 border justify-center rounded border-pink-500"
        @click="loadMore"
      >
        Load more
      </button>

      <message-row v-for="message in messages" :key="message.id" :message="message" :mine="isMine(message)" />
      <message-sender :chat="chat" @message="saveMessage" @error="(e) => (error = e)" />
    </div>
  </template>
  <template v-else>
    <div class="flex justify-center items-center h-full">
      <p class="text-2xl">Invalid chat</p>
    </div>
  </template>
</template>
<script setup lang="ts">
import ChatHeader from '~/components/chat/ChatHeader.vue';
import MessageRow from '~/components/chat/MessageRow.vue';
import MessageSender from '~/components/chat/MessageSender.vue';
import InviteToChat from '~/components/chat/InviteToChat.vue';
import ErrorModal from '~/components/ErrorModal.vue';

import { useChatStore, useAccountStore } from '~/store';
import type { ChatMessageResponseDTO } from '~/types/dtos';

definePageMeta({
  layout: 'chat',
});

const error = ref<Error | null>(null);

const route = useRoute();
const router = useRouter();
const canLoadMore = ref(true);

const chatStore = useChatStore();
const accountStore = useAccountStore();

const saveMessage = (message: ChatMessageResponseDTO) => {
  chatStore.addMessage(Number(route.params.id), message);
};

const chat = computed(() => chatStore.getChat(Number(route.params.id)));

if (!chat.value) {
  router.push('/chat');
}
const messages = computed(() => chatStore.getMessages(Number(route.params.id)));

const isMine = (message: ChatMessageResponseDTO) => {
  return message.sender.address === accountStore.address;
};

const isChatAdmin = computed(() => {
  return chat.value && chat.value.admin.address === accountStore.address;
});

const pageNumber = ref(1);

const loadMore = async () => {
  pageNumber.value++;
  const params: URLSearchParams = new URLSearchParams({
    pageNumber: String(pageNumber.value),
    pageSize: '20',
  });
  const newMessages = await $fetch(`/api/chat/${route.params.id}/messages?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accountStore.accessToken}`,
    },
  });
  if (newMessages.length === 0) {
    canLoadMore.value = false;
  }
  chatStore.addMessages(Number(route.params.id), newMessages);
};

onMounted(async () => {
  // Load messages
  const params: URLSearchParams = new URLSearchParams({
    pageNumber: String(pageNumber.value),
    pageSize: '20',
  });
  const messages = await $fetch(`/api/chat/${route.params.id}/messages?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accountStore.accessToken}`,
    },
  });
  chatStore.setMessages(Number(route.params.id), messages);
});
</script>
