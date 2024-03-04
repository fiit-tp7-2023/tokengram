<template>
  <div class="flex items-center justify-between w-full border-b-2 bg-slate-600 text-white p-4">
    <NuxtLink to="/" class="text-xl">TokenGram</NuxtLink>
    <span class="w-1/2">
      <SearchBar />
    </span>
    <button v-if="!account" class="border-2 p-2 rounded-md" @click="connectWallet">Connect wallet</button>
    <button v-else class="border-2 p-2 rounded-md" @click="disconnectWallet">Disconnect wallet</button>
  </div>
</template>
<script lang="ts" setup>
import SearchBar from '../controls/SearchBar.vue';
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
