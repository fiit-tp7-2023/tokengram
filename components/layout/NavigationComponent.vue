<template>
  <div class="flex justify-between w-full border-b-2 pb-2">
    <p v-if="account" class="h-full p-2"><b>Connected account:</b> {{ account }}</p>
    <button v-if="!account" class="border-2 p-2 rounded-md" @click="connectWallet">Connect wallet</button>
    <button v-else class="border-2 p-2 rounded-md" @click="disconnectWallet">Disconnect wallet</button>
  </div>
</template>
<script lang="ts" setup>
import { useAccountStore } from '~/store';

const { $web3 } = useNuxtApp();

const accountStore = useAccountStore();

const account = computed(() => accountStore.account);

onMounted(async () => {
  const accounts = await $web3?.eth.getAccounts();
  accountStore.setAccount(accounts?.[0] ?? null);
});

const connectWallet = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await $web3?.eth.getAccounts();
      accountStore.setAccount(accounts?.[0] ?? null);
    } catch (error) {
      console.error(error);
    }
  }
};

const disconnectWallet = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_accounts' });
      accountStore.setAccount(null);
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
