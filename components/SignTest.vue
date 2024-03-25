<template>
  <div class="flex flex-col gap-2">
    <TextInput v-model="message" label="Original message:" placeholder="Here place your message" />
    <TextInput v-model="signature" readonly label="Signature:" placeholder="Your signed message" />
    <ConfirmButton text="Sign" @click="signMessage" />
  </div>
</template>

<script lang="ts" setup>
import { useLogger } from '@nuxt/kit';
import TextInput from './controls/TextInput.vue';
import ConfirmButton from './controls/ConfirmButton.vue';
import { useAccountStore } from '~/store';

const logger = useLogger('sign-test::');

const { $web3 } = useNuxtApp();
const accountStore = useAccountStore();

const account = computed(() => accountStore.account);
const message = ref('');
const signature = ref('');

const signMessage = async () => {
  if (window.ethereum && account.value) {
    try {
      logger.info('Signing message');
      const result = await $web3?.eth.personal.sign($web3.utils.utf8ToHex(message.value), account.value, '');
      logger.info('Message signed');
      signature.value = result?.toString() ?? '';
    } catch (error) {
      logger.error(error);
    }
  }
};
</script>

<style></style>
