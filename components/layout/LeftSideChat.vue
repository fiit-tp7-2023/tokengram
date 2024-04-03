<template>
  <div class="h-full border-r my-2 border-gray-400 md:p-2">
    <ul class="flex flex-col items-start">
      <li><button @click="createChat">Create new chat</button></li>
      <li v-for="user in users" :key="user.address" class="w-full">
        <contact-row :user="user" :selected="user.address == $route.params.address" />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { HubConnectionState } from '@microsoft/signalr';
import ContactRow from '~/components/chat/ContactRow.vue';
import { useAccountStore, useUsersStore } from '~/store';

const usersStore = useUsersStore();
const accountStore = useAccountStore();

const users = computed(() => usersStore.users);

const logger = useLogger('CHAT_HUB::');
const signal = useSignalR();
if (!accountStore.accessToken) {
  throw new Error('No access token');
}
signal.initialize(accountStore.accessToken);
signal.registerHandler('UserJoinedChat', (id, dto) => logger.log(id, dto));

const createChat = async () => {
  await signal.createChat([], 'Test chat');
};

onMounted(async () => {
  if (signal.connectionState.value === HubConnectionState.Disconnected) {
    await signal.connect();
  }
});
</script>
