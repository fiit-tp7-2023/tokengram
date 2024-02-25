<template>
  <div class="flex flex-col gap-2">
    <h1 class="text-2xl">Welcome to TokenGram</h1>
    <label class="underline font-bold" for="message">Original message:</label>
    <input
      v-model="message"
      class="border-2 rounded-md p-2"
      type="text"
      name="message"
      placeholder="Here place your message"
    />
    <label class="underline font-bold" for="signature">Signature:</label>
    <input
      v-model="signature"
      class="border-2 rounded-md p-2"
      readonly
      type="text"
      name="signature"
      placeholder="Your signed message"
    />
    <button class="w-full border-2 p-2 rounded-md" @click="signMessage">Sign</button>
  </div>
</template>
<script lang="ts" setup>
import { useAccountStore } from '~/store';

const { $web3 } = useNuxtApp();
const accountStore = useAccountStore();

const account = computed(() => accountStore.account);
const message = ref('');
const signature = ref('');

const signMessage = async () => {
  if (window.ethereum && account.value) {
    try {
      const hashed = $web3?.utils.sha3(message.value);
      const result = await $web3?.eth.sign(hashed!, account.value);
      signature.value = result?.toString() ?? '';
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
