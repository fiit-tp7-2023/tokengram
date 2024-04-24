<template>
  <div class="flex flex-col justify-start items-center gap-2 mt-4 w-full h-screen">
    <h1 class="text-2xl font-bold">User Settings</h1>
    <div class="flex flex-col rounded-md bg-black border border-pink-500 w-full m-2 p-4 gap-4">
      <span class="flex justify-between items-center w-full">
        <span class="flex flex-col gap-1">
          <p class="font-semibold">Profile picture</p>
          <img
            v-if="editedProfilePicture"
            :src="editedProfilePicture"
            alt="Profile picture"
            class="border-2 p-2 size-40 object-cover rounded-full"
          />
          <span v-else class="border-2 p-2 size-40 rounded-full flex justify-center items-center">No image</span>
        </span>
        <span class="w-1/3">
          <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="previewPic" />
          <ConfirmButton primary text="Change photo" @click="openFileInput" />
          <button
            :disabled="!editedProfilePicture"
            :class="{
              'cursor-not-allowed bg-gray-500 text-gray-500': !editedProfilePicture,
            }"
            class="text-white w-full border-2 mt-2 p-2 rounded"
            @click="removePhoto"
          >
            Remove photo
          </button>
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
const profilePicture = computed(() => accountStore.profilePicture);

const editedUsername = ref(username.value);
const editedProfilePicture = ref(profilePicture.value);

const fileInput = ref<HTMLInputElement | null>(null);

const previewPic = () => {
  if (fileInput.value?.files?.length) {
    const reader = new FileReader();
    reader.onload = (e) => {
      editedProfilePicture.value = e.target?.result as string;
    };
    reader.readAsDataURL(fileInput.value.files[0]);
  }
};

const openFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const removePhoto = () => {
  editedProfilePicture.value = null;
  fileInput.value!.value = '';
};

const saveChanges = async () => {
  const fd = new FormData();
  if (editedProfilePicture.value !== profilePicture.value) {
    fd.append('profilePicture', editedProfilePicture.value ?? '');
  }
  if (editedUsername.value !== username.value) {
    fd.append('username', editedUsername.value);
  }
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
  return !!(editedUsername.value !== username.value || editedProfilePicture.value !== profilePicture.value);
});
</script>

<style></style>
