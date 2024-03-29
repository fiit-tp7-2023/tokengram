<template>
  <chat-header :user="user" />
  <div class="flex flex-col gap-2">
    <message-row v-for="message in messages" :key="message.id" :message="message" />
  </div>
</template>
<script setup lang="ts">
import ChatHeader from '~/components/chat/ChatHeader.vue';
import MessageRow from '~/components/chat/MessageRow.vue';

import { useChatStore, useUsersStore } from '~/store';
definePageMeta({
  layout: 'chat',
});

const route = useRoute();

const userStore = useUsersStore();

const user = computed(() => userStore.getUser(route.params.address as string));

const chatStore = useChatStore();

const messages = computed(() => (user.value ? chatStore.getMessages(user.value.address) : []));
</script>
