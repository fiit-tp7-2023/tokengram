<template>
  <div class="flex flex-col justify-start items-center gap-2 mt-4 w-full h-screen">
    <h1 class="text-2xl font-bold">User Settings</h1>
    <div class="flex flex-col rounded-md bg-black border border-pink-500 w-full m-2 p-4 gap-4">
      <span class="flex justify-between items-center w-full">
        <span class="flex flex-col gap-1">
          <p class="font-semibold">Profile picture</p>
          <img v-if="profilePicture" :src="profilePicture" alt="Profile picture" class="border-2 p-2" />
          <span v-else class="border-2 p-2">No image</span>
        </span>
        <span class="w-1/3">
          <input ref="fileInput" type="file" accept="image/*" style="display: none" @change="openFileInput" />
          <ConfirmButton text="Change photo" @click="openFileInput" />
        </span>
      </span>
      <hr />
      <span class="flex justify-between items-center w-full">
        <span class="flex flex-col gap-1">
          <p class="font-semibold">Username</p>
          <TextInput v-model="editedUsername" :placeholder="username" />
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
      <span class="flex justify-end gap-4">
        <ConfirmButton primary :disabled="!canSave" text="Save changes" @click="saveChanges" />
        <ConfirmButton text="Exit" @click="exit" />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ConfirmButton from '~/components/controls/ConfirmButton.vue';
import TextInput from '~/components/controls/TextInput.vue';
import { useAccountStore } from '~/store';

const accountStore = useAccountStore();
const username = computed(() => accountStore.username ?? '');
const address = computed(() => accountStore.address);

const editedUsername = ref(username.value);
const profilePicture = ref('');

const fileInputRef = ref<HTMLInputElement | null>(null);

const openFileInput = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
};

const saveChanges = async () => {
  const fd = new FormData();
  if (fileInputRef.value?.files?.length) {
    fd.append('profilePicture', fileInputRef.value.files[0]);
  }
  fd.append('username', editedUsername.value);
  try {
    await $fetch(`/api/user`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accountStore.accessToken}`,
      },
      body: fd,
    });
  } catch (error) {
    throw new Error('Error saving changes: ' + error);
  }
};

const router = useRouter();

const exit = () => {
  router.push('/');
};

const canSave = computed(() => {
  return !!(editedUsername.value !== username.value || profilePicture.value);
});
</script>

<style></style>
