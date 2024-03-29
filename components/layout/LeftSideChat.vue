<template>
  <div class="h-full border-r my-2 border-gray-400 md:p-2">
    <ul class="flex flex-col items-start">
      <li v-for="user in users" :key="user.address" class="w-full">
        <contact-row :user="user" :selected="user.address == $route.params.address" />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import ContactRow from '~/components/chat/ContactRow.vue';
import { useUsersStore } from '~/store';

const usersStore = useUsersStore();

const users = computed(() => usersStore.users);

onMounted(() => {
  usersStore.setUsers([
    {
      address: '0xabcde',
      username: 'Brano',
    },
    {
      address: '0xcdefg',
      username: 'Deno',
    },
    {
      address: '0xde141',
      username: 'Zdeno',
    },
    {
      address: '0x123abc',
    },
  ]);
});
</script>
