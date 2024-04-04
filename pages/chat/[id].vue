<template>
  <template v-if="chat">
    <chat-header :chat="chat" />
    <div class="w-full flex flex-col justify-end gap-2">
      <message-row v-for="message in messages" :key="message.id" :message="message" />
      <message-sender :chat="chat" @message="saveMessage" />
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
import { useChatStore, useAccountStore } from '~/store';
import type { ChatMessageResponseDTO } from '~/types/dtos';

definePageMeta({
  layout: 'chat',
});

const route = useRoute();
const router = useRouter();

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

const pageNumber = ref(1);

onMounted(async () => {
  // Load messages
  const params: URLSearchParams = new URLSearchParams({
    pageNumber: String(pageNumber.value),
    pageSize: '10',
  });
  const messages = await $fetch(`/api/chat/${route.params.id}/messages?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accountStore.accessToken}`,
    },
  });
  chatStore.setMessages(Number(route.params.id), messages);
});
</script>
