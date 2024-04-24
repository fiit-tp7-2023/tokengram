<template>
  <nav class="flex items-center justify-between w-full bg-black text-white p-4">
    <teleport to="body">
      <select-account-modal
        v-if="accountSelection"
        :accounts="availableAccounts"
        @close="() => accountSelectionRejectionFunc!()"
        @select="(acc) => accountSelectionResolutionFunc!(acc)"
      />
    </teleport>
    <NuxtLink to="/" class="text-xl font-mono text-pink-500 font-bold">TokenGram</NuxtLink>
    <span class="w-1/2">
      <SearchBar v-if="!noSearch" />
    </span>
    <button
      v-if="!account"
      :class="{
        'cursor-not-allowed border-gray-700 text-gray-700': availableAccounts.length === 0,
      }"
      class="border-2 p-2 font-mono rounded-md w-200"
      @click="connectWallet"
    >
      Connect
    </button>
    <button
      v-else
      class="border-2 border-pink-500 text-pink-500 hover:border-pink-400 hover:text-pink-400 font-semibold p-2 font-mono rounded-md"
      @click="disconnectWallet"
    >
      Disconnect
    </button>
  </nav>
</template>
<script lang="ts" setup>
import SearchBar from '~/components/controls/SearchBar.vue';
import SelectAccountModal from '~/components/SelectAccountModal.vue';

import type { UserProfileDTO, VerifyNonce } from '~/types/dtos';
import { useAccountStore } from '~/store';

defineProps({
  noSearch: {
    type: Boolean,
    default: false,
  },
});

const { $web3 } = useNuxtApp();
const logger = useLogger('wallet::');

const accountStore = useAccountStore();

const account = computed(() => accountStore.address);

const availableAccounts = ref<string[]>([]);

const accountSelectionResolutionFunc = ref<((value: string) => void) | null>(null);
const accountSelectionRejectionFunc = ref<(() => void) | null>(null);
const accountSelection = ref(false);

const askForAccount = async () => {
  try {
    accountSelection.value = true;
    const acc = await new Promise<string>((resolve, reject) => {
      accountSelectionResolutionFunc.value = resolve;
      accountSelectionRejectionFunc.value = reject;
    });
    accountSelection.value = false;
    accountSelectionResolutionFunc.value = null;
    accountSelectionRejectionFunc.value = null;
    return acc;
  } catch (e) {
    accountSelection.value = false;
    accountSelectionResolutionFunc.value = null;
    accountSelectionRejectionFunc.value = null;
  }
};

onMounted(async () => {
  if (!window.ethereum) {
    logger.error('No web3 provider');
    return;
  }
  logger.info('Requesting accounts');
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  availableAccounts.value = (await $web3?.eth.getAccounts()) ?? [];
  if (!account.value) {
    return;
  }

  if (!accountStore.accessToken || !accountStore.refreshToken) {
    return;
  }
  logger.info('Refresh tokens');
  const { accessToken, refreshToken } = await $fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ jwt: accountStore.accessToken, refreshToken: accountStore.refreshToken }),
  });
  accountStore.setToken(accessToken, refreshToken);

  // Get user profile
  const user = await $fetch<UserProfileDTO>('/api/user/' + account.value, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  accountStore.setUsername(user.username ?? null);
  accountStore.setProfilePicture(user.profilePicture ?? null);
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
    let address: string | undefined = availableAccounts.value[0];
    if (availableAccounts.value.length > 1) {
      address = await askForAccount();
    }
    if (!address) {
      return;
    }
    accountStore.setAddress(address);
    try {
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
      // Get user profile
      const user = await $fetch<UserProfileDTO>('/api/user/' + address, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      accountStore.setUsername(user.username ?? null);
      accountStore.setProfilePicture(user.profilePicture ?? null);
    } catch (error) {
      logger.error(error);
    }
  }
};
const router = useRouter();
const disconnectWallet = async () => {
  if (window.ethereum) {
    try {
      logger.info('Disconnecting account');
      await window.ethereum.request({ method: 'eth_accounts' });
      accountStore.disconnect();
      router.push('/home');
    } catch (error) {
      logger.error(error);
    }
  }
};
</script>
