<template>
  <div class="wrapper">
    <input v-model="address" class="address-input" type="text" />
    <button class="send-button" @click="inviteToChat">Invite</button>
  </div>
</template>

<script lang="ts" setup>
const address = ref('');

const route = useRoute();

const signal = useSignalR();
const inviteToChat = async () => {
  await signal.inviteToChat(Number(route.params.id), address.value);
};
</script>

<style scoped>
.wrapper {
  @apply flex gap-2 py-2;
}
.address-input {
  @apply w-full rounded py-2 px-2 border bg-transparent text-white;
}

.send-button {
  @apply bg-pink-500 hover:bg-pink-400 rounded py-2 px-2 w-20;
}
</style>
