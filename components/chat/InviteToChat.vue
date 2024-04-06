<template>
  <div class="w-full py-2 px-2 mx-2 my-2 flex justify-between">
    <input v-model="address" class="w-full rounded py-2 px-2 border" type="text" />
    <button class="bg-slate-300 rounded py-2 px-2 ml-2 w-20" @click="inviteToChat">Invite</button>
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

<style></style>
