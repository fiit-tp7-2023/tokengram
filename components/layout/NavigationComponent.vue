<template>
  <div class="flex items-center justify-between w-full border-b-2 bg-slate-600 text-white p-4">
    <NuxtLink to="/" class="text-xl">TokenGram</NuxtLink>
    <span class="w-1/2">
      <SearchBar />
    </span>
    <button v-if="!account" class="border-2 p-2 rounded-md w-200" @click="connectWallet">Connect wallet</button>
    <button v-else class="border-2 p-2 rounded-md" @click="disconnectWallet">Disconnect wallet</button>
  </div>
</template>
<script lang="ts" setup>
import SearchBar from '../controls/SearchBar.vue';
import type { VerifyNonce } from '~/types/auth';
import { useAccountStore } from '~/store';

const { $web3 } = useNuxtApp();
const logger = useLogger('wallet::');

const accountStore = useAccountStore();

const account = computed(() => accountStore.account);

onMounted(async () => {
  if (!account.value) {
    return;
  }
  logger.info('Account connected:', account);

  logger.info('Refresh tokens');
  const { accessToken, refreshToken } = await $fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ jwt: accountStore.accessToken, refreshToken: accountStore.refreshToken }),
  });
  accountStore.setToken(accessToken, refreshToken);
});

const signMessage = async (message: string): Promise<string> => {
  if (!window.ethereum || !account.value) {
    throw new Error('No account or web3 provider');
  }
  const result = await $web3?.eth.personal.sign($web3.utils.utf8ToHex(message), account.value, '');
  if (!result) {
    throw new Error('Could not sign message');
  }
  return result.toString();
};

const connectWallet = async () => {
  if (window.ethereum) {
    try {
      logger.info('Requesting accounts');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await $web3?.eth.getAccounts();
      const address = accounts?.[0];
      if (!address) {
        throw new Error('No account connected');
      }
      accountStore.setAccount(address);
      logger.info('Account connected');
      logger.info('Requesting nonce');
      const query = new URLSearchParams({ address });
      const nonce = await $fetch(`/api/auth/nonce?${query.toString()}`);
      logger.info('Signing nonce');
      const signature = await signMessage(nonce);
      logger.info('Signed nonce:', signature);
      logger.info('Requesting tokens');
      const { accessToken, refreshToken } = await $fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, signature } as VerifyNonce),
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
