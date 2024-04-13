<template>
  <div class="w-full py-2 px-2 mx-2 my-2 flex justify-between">
    <input v-model="message" class="w-full rounded py-2 px-2 border" type="text" @keyup.enter="sendMessage" />
    <button class="bg-blue-300 hover:bg-blue-200 rounded py-2 px-2 ml-2 w-20" @click="sendMessage">Send</button>
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

<style></style>
