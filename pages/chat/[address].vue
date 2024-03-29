<template>
  <chat-header :user="user" />
</template>
<script setup lang="ts">
import ChatHeader from '~/components/chat/ChatHeader.vue';
import { useUsersStore } from '~/store';
definePageMeta({
  layout: 'chat',
});

const route = useRoute();

const userStore = useUsersStore();

const user = computed(() => userStore.getUser(route.params.address as string));
</script>
