<template>
  <naive-config :theme-config="themeConfig">
    <n-message-provider>
      <n-layout>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </n-layout>
    </n-message-provider>
  </naive-config>
</template>
<script setup lang="ts">
import type { ThemeConfig } from '@bg-dev/nuxt-naiveui';
import { useUsersStore, useTokenStore, useChatStore } from '~/store';
import { MOCKED_USERS, MOCKED_POSTS, MOCKED_DANO_CHATS } from '~/mocks';

const usersStore = useUsersStore();
const tokenStore = useTokenStore();
const chatStore = useChatStore();

onMounted(() => {
  // Mock users
  usersStore.setUsers(MOCKED_USERS);

  // Mock posts
  tokenStore.setPosts(MOCKED_POSTS);

  // Mock messages
  chatStore.setMessages('0xabcde', MOCKED_DANO_CHATS);
});

const themeConfig: ThemeConfig = {
  shared: {
    common: {
      baseColor: 'rgb(244,244,249)',
      bodyColor: 'rgb(244,244,249)',
      inputColor: '#fff',
      textColor1: '#000',
      textColor2: '#000',
      textColor3: '#000',
    },
  },
};
</script>
