<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <div class="fixed bottom-0 right-0 p-4 z-50 gap-2 flex flex-col">
    <PopupMessage
      v-for="(notification, id) in notifications"
      :key="id"
      :title="notification.title"
      :message="notification.content"
      :type="notification.type"
      @close="clearNotification(id)"
    />
  </div>
</template>
<script setup lang="ts">
import { useNotificationStore } from '~/store';

const notificationStore = useNotificationStore();

const notifications = computed(() => notificationStore.items);

const clearNotification = (id: string) => {
  notificationStore.remove(id);
};
</script>
<style>
div,
span,
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  @apply font-mono text-white;
}
body {
  @apply bg-slate-800;
}
</style>
