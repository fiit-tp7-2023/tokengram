<template>
  <div class="profile-container">
    <h1 class="text-2xl font-mono text-pink-500">{{ userProfile.username }}</h1>
    <div class="user-details mt-4 bg-slate-900 text-white p-6 rounded-lg flex">
      <img
        :src="userProfile.profilePicture || 'default-profile.png'"
        alt="Profile Picture"
        class="profile-picture shadow-lg"
      />
      <div class="info ml-6">
        <h2 class="text-xl font-mono">{{ userProfile.address }}</h2>
        <div class="follow-info mt-4">
          <h3>Followers: {{ userProfile.followerCount }}</h3>
          <h3>Following: {{ userProfile.followingCount }}</h3>
        </div>
        <button v-if="!userProfile.isOwnProfile" class="follow-button" @click="followUser">Follow</button>
      </div>
    </div>
    <hr class="mt-6 border-t border-gray-500" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAccountStore } from '~/store';

const error = ref<Error | null>(null);

const route = useRoute();
const accountStore = useAccountStore();
const userProfile = ref({
  username: '',
  address: '',
  profilePicture: '',
  followerCount: 0,
  followingCount: 0,
  isOwnProfile: false,
});

const fetchUserProfile = async () => {
  const address = route.params.address; // Get the address from the URL parameter
  try {
    const data = await $fetch(`/api/user/${address}`, {
      headers: {
        Authorization: `Bearer ${accountStore.accessToken}`,
      },
    });

    userProfile.value = {
      ...data,
      username: data.username || 'Anonymous', // Default if undefined
      profilePicture: data.profilePicture || 'default-profile.png',
      isOwnProfile: accountStore.address === address,
      followerCount: data.followerCount || 0, // Default to 0 if undefined
      followingCount: data.followingCount || 0,
    };
  } catch (e) {
    error.value = e as Error;
  }
};

const followUser = async () => {
  await $fetch(`/api/user/:id/following`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accountStore.accessToken}`,
    },
  });
  fetchUserProfile(); // Re-fetch or adjust local state to show updated follower count
};

onMounted(fetchUserProfile);
</script>

<style scoped>
.profile-container {
  @apply max-w-5xl mx-auto p-5 shadow-lg rounded-lg bg-[#1e293b];
}

.user-details {
  @apply flex items-center justify-between bg-[#1e293b] rounded-lg p-5;
}

.profile-picture {
  @apply w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg;
}

.info {
  @apply flex flex-col justify-center ml-5 grow;
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
  width: 100%; /* Ensures the button stretches to fill its container */
}

.follow-button:hover {
  @apply bg-[#ec4899];
}

.follow-info {
  @apply flex gap-5 mt-2.5 justify-end items-center;
  width: 100%; /* This ensures the flex container takes full width */
}

.follow-info h3 {
  @apply bg-[rgba(255,255,255,0.1)] py-2.5 px-2.5 rounded flex-1 text-center; /* flex-1 allows each item to take equal space */
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

  .follow-info {
    @apply justify-center;
  }
}
</style>
