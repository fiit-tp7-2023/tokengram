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
import { useLogger } from '@nuxt/kit';
import SearchBar from '../controls/SearchBar.vue';
import { useAccountStore } from '~/store';

const { $web3 } = useNuxtApp();
const logger = useLogger('wallet::');

const accountStore = useAccountStore();

const account = computed(() => accountStore.account);

onMounted(async () => {
  const accounts = await $web3?.eth.getAccounts();
  accountStore.setAccount(accounts?.[0] ?? null);
});

const signMessage = async (message: string): Promise<string> => {
  if (window.ethereum && account.value) {
    const result = await $web3?.eth.personal.sign($web3.utils.utf8ToHex(message), account.value, '');
    return result?.toString() ?? '';
  }
  throw new Error('No account or web3 provider');
};

const connectWallet = async () => {
  if (window.ethereum) {
    try {
      logger.info('Requesting accounts');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await $web3?.eth.getAccounts();
      accountStore.setAccount(accounts?.[0] ?? null);
      logger.info('Account connected');
      logger.info('Requesting nonce');
      const nonce = await $fetch('/api/auth/nonce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: accounts?.[0] }),
      });
      logger.info('Signing nonce');
      const signedNonce = await signMessage(nonce);
      const { accessToken, refreshToken } = await $fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: accounts?.[0], signedNonce }),
      });
      logger.info('Saving tokens');
      accountStore.setToken(accessToken, refreshToken);
    } catch (error) {
      logger.error(error);
    }
  }
};

const disconnectWallet = async () => {
  if (window.ethereum) {
    try {
      logger.info('Disconnecting account');
      await window.ethereum.request({ method: 'eth_accounts' });
      accountStore.disconnect();
    } catch (error) {
      logger.error(error);
    }
  }
};
</script>
