<template>
  <!--Create new chat modal, where you can invite friends-->
  <div class="absolute top-0 left-0 z-40 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-black border border-pink-500 w-96 h-min-96 rounded-lg p-4 flex flex-col gap-4">
      <h1 class="text-2xl text-center">Create new chat</h1>
      <input v-model="chatName" class="rounded py-2 px-2 border bg-transparent" type="text" placeholder="Chat name" />
      <h2 class="text-lg">Invite friends</h2>
      <ul class="flex flex-col gap-2 mb-2">
        <li v-for="user in users" :key="user.id" class="w-full flex justify-between">
          <input
            :id="user.id"
            type="text"
            class="w-3/4 bg-transparent rounded py-2 px-2 border"
            @input="(e) => updateAddress(user.id, (e.target as HTMLInputElement).value)"
          />
          <button
            class="border border-slate-300 hover:border-pink-300 rounded py-2 px-2 w-20 self-center"
            @click="removeUser(user.id)"
          >
            Remove
          </button>
        </li>
        <li>
          <button
            class="border border-slate-300 hover:border-pink-300 rounded py-2 px-2 w-full self-center"
            @click="addUser"
          >
            <Icon name="mdi:add" />
          </button>
        </li>
      </ul>
      <button
        class="rounded py-2 px-2 w-full border"
        :class="[
          canCreateChat
            ? ' bg-pink-500  hover:bg-pink-400 text-black'
            : 'bg-slate-100 text-gray-400 cursor-not-allowed',
        ]"
        @click="createChat"
      >
        Create
      </button>
      <button class="border rounded py-2 px-2 w-full" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useChatStore, useNotificationStore } from '~/store';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

type InvitedUser = {
  id: string;
  address: string;
};

const chatName = ref('');
const users = ref<InvitedUser[]>([]);

const updateAddress = (id: string, address: string) => {
  const user = users.value.find((u) => u.id === id);
  if (user) {
    user.address = address;
  }
};

const addUser = () => {
  users.value.push({ id: crypto.randomUUID(), address: '' });
};

const removeUser = (id: string) => {
  const index = users.value.findIndex((u) => u.id === id);
  if (index !== -1) {
    users.value.splice(index, 1);
  }
};

const canCreateChat = computed(() => {
  return (
    chatName.value.length > 0 &&
    users.value.every((u) => u.address.length > 0 && /^(0x)?[0-9a-fA-F]{40}$/.test(u.address))
  );
});

const signal = useSignalR();
const chatStore = useChatStore();
const router = useRouter();
const notificationStore = useNotificationStore();

const createChat = async () => {
  if (!canCreateChat.value) return;
  const addresses = users.value.map((u) => u.address);
  const newChat = await signal.createChat(addresses, chatName.value);
  chatStore.addChat(newChat);
  emit('close');
  notificationStore.addNotification('Chat created!', `Chat ${chatName.value} created`);

  router.push(`/chat/${newChat.id}`);
};
</script>

<style></style>
