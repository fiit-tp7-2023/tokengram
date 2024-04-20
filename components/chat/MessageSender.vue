<template>
  <div class="wrapper">
    <input v-model="message" class="message-input" type="text" @keyup.enter="sendMessage" />
    <button class="send-button" :disabled="!message.length" @click="sendMessage">Send</button>
  </div>
</template>

<script lang="ts" setup>
import type { ChatMessageResponseDTO, ChatResponseDTO } from '~/types/dtos';

const props = defineProps({
  chat: {
    type: Object as PropType<ChatResponseDTO>,
    required: true,
  },
});

const logger = useLogger('chat::message-sender');

const emit = defineEmits<{
  (e: 'message', message: ChatMessageResponseDTO): void;
  (e: 'error', error: Error): void;
}>();
const message = ref('');

const signal = useSignalR();

const sendMessage = async () => {
  if (!message.value) return;
  try {
    const newMess = await signal.sendMessage(props.chat.id, message.value);
    emit('message', newMess);
    message.value = '';
  } catch (e) {
    logger.error(e);
    emit('error', e as Error);
  }
};
</script>

<style scoped>
.wrapper {
  @apply flex gap-2 pt-2;
}
.message-input {
  @apply w-full rounded py-2 px-2 border bg-transparent text-white;
}

.send-button {
  @apply bg-pink-500 hover:bg-pink-400 rounded py-2 px-2 w-20;
}
</style>
