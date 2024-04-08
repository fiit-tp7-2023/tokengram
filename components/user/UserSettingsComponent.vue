<template>
  <div class="flex flex-col justify-start items-center gap-2 mt-4 w-full h-screen">
    <h1 class="text-2xl font-bold">User Settings</h1>
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
          <span v-if="!isEditingUsername">{{ username }}</span>
          <TextInput v-else v-model="editedUsername" :placeholder="username" />
        </span>
        <span class="flex gap-2">
          <ConfirmButton v-if="isEditingUsername" text="Confirm" @click="saveChanges" />
          <ConfirmButton v-else text="Change username" @click="toggleEditing" />
        </span>
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
        <ConfirmButton text="Exit" @click="skip" />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import ConfirmButton from '~/components/controls/ConfirmButton.vue';
import TextInput from '~/components/controls/TextInput.vue';
import { useAccountStore } from '~/store';

definePageMeta({
  layout: 'plain',
});

const accountStore = useAccountStore();
const address = computed(() => accountStore.account);

const isEditingUsername = ref(false);
const editedUsername = ref('');
const username = ref('username1');

const toggleEditing = () => {
  isEditingUsername.value = !isEditingUsername.value;
  if (!isEditingUsername.value) {
    editedUsername.value = username.value;
  }
};

const saveChanges = () => {
  if (isEditingUsername.value) {
    accountStore.setAlias(editedUsername.value);
    isEditingUsername.value = false;
  }
};

const r = useRouter();

const skip = () => {
  r.push('/');
};
</script>

<style></style>
