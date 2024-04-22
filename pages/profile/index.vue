<template>
  <div class="profile-container">
    <h1 class="text-2xl font-mono text-pink-500">{{ address }}</h1>
    <div class="user-details mt-4 bg-slate-900 text-white p-6 rounded-lg flex">
      <img :src="profilePicture" alt="Profile Picture" class="profile-picture shadow-lg" />
      <div class="info ml-6">
        <h2 class="text-xl font-mono">{{ username }} Username</h2>
        <!--username placeholder-->
        <div class="follow-info mt-4">
          <h3>Followers: 150</h3>
          <h3>Following: 75</h3>
        </div>
        <button v-if="!isOwnProfile" class="follow-button" @click="followUser">Follow</button>
      </div>
    </div>
    <hr class="mt-6 border-t border-gray-500" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useAccountStore } from '~/store';

const accountStore = useAccountStore();
const username = computed(() => accountStore.username ?? '');
const address = computed(() => accountStore.address);

const profilePicture = ref('');

const isOwnProfile = computed(() => {
  return accountStore.address === address.value;
});

const followUser = () => {
  // console.log('Follow');
  // TODO
};
</script>

<style scoped>
.profile-container {
  @apply max-w-full mx-auto p-5 shadow-lg rounded-lg bg-[#1e293b];
}

.user-details {
  @apply flex items-center bg-[#1e293b] rounded-lg p-5;
}

.profile-picture {
  @apply w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg;
}

.info {
  @apply flex flex-col justify-center ml-5;
}

h1,
h2,
h3 {
  @apply text-white;
}

h1 {
  @apply text-2xl font-mono text-[#f472b6];
}

h2 {
  @apply text-xl font-mono;
}

.follow-button {
  @apply mt-5 py-2.5 px-5 bg-[#f472b6] text-white border-none rounded cursor-pointer transition-colors;
}

.follow-button:hover {
  @apply bg-[#ec4899];
}

.follow-info {
  @apply flex gap-5 mt-2.5;
}

.follow-info h3 {
  @apply bg-[rgba(255,255,255,0.1)] py-2.5 px-2.5 rounded;
}

hr {
  @apply mt-5 border-t border-[rgba(130,130,130,0.5)];
}

@media (max-width: 768px) {
  .user-details {
    @apply flex-col items-center;
  }

  .info {
    @apply ml-0 mt-5;
  }
}
</style>
