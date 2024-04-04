<template>
  <div class="w-full py-2 px-2 mx-2 my-2 flex justify-between">
    <input v-model="message" class="w-full rounded py-2 px-2 border" type="text" />
    <button class="bg-slate-300 rounded py-2 px-2 ml-2 w-20" @click="sendMessage">Send</button>
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

const emit = defineEmits<{
  (e: 'message', message: ChatMessageResponseDTO): void;
}>();
const message = ref('');

const signal = useSignalR();

const sendMessage = async () => {
  const newMess = await signal.sendMessage(props.chat.id, message.value);
  emit('message', newMess);
  message.value = '';
};
</script>

<style></style>
