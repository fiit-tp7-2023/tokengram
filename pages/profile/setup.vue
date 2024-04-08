<template>
  <div class="flex flex-col justify-start items-center gap-2 mt-4 w-full h-screen">
    <h1 class="text-2xl font-bold">Setup your profile</h1>
    <div class="flex flex-col rounded-md bg-white w-full m-2 p-4 gap-4">
      <span class="flex justify-between items-center w-full">
        <span class="flex flex-col gap-1">
          <p class="font-semibold">Profile picture</p>
          <span class="border-2 p-2">IMG</span>
        </span>
        <span class="w-1/3"> <ConfirmButton text="Change photo" /></span>
      </span>
      <hr />
      <span class="flex justify-between items-center w-full">
        <span class="flex flex-col gap-1">
          <p class="font-semibold">Username</p>
          <TextInput v-model="alias" :placeholder="address" />
        </span>
        <span class="w-1/3"></span>
      </span>
      <hr />
      <span class="flex justify-between items-center w-full">
        <span class="flex flex-col gap-1">
          <p class="font-semibold">Address</p>
          <p>{{ address }}</p>
        </span>
        <span class="w-1/3"></span>
      </span>
      <span class="grid grid-cols-3 gap-4 justify-between">
        <div />
        <ConfirmButton text="Save changes" @click="saveChanges" />
        <ConfirmButton text="Skip" @click="skip" />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ConfirmButton from '~/components/controls/ConfirmButton.vue';
import TextInput from '~/components/controls/TextInput.vue';
import { useAccountStore } from '~/store';
definePageMeta({
  layout: 'plain',
});

const accountStore = useAccountStore();
const address = computed(() => accountStore.address);
const alias = ref(accountStore.username);

const saveChanges = () => {
  accountStore.setUsername(alias.value);
};

const r = useRouter();

const skip = () => {
  r.push('/');
};
</script>

<style></style>
