<template>
  <div class="profile-container">
    <h1 class="text-2xl font-mono text-pink-500">{{ userProfile.username }}</h1>
    <div class="user-details mt-4 bg-slate-900 text-white p-6 rounded-lg flex">
      <img :src="userProfile.profilePicture" alt="Profile Picture" class="profile-picture shadow-lg" />
      <div class="info ml-6">
        <h2 class="text-xl font-mono">{{ userProfile.address }}</h2>
        <div class="follow-info mt-4">
          <h3>Followers: {{ userProfile.followerCount }}</h3>
          <h3>Following: {{ userProfile.followingCount }}</h3>
        </div>
      </div>
    </div>
    <hr class="mt-6 border-t border-gray-500" />
    <div class="w-full flex flex-col gap-2 mt-2">
      <nft-post
        v-for="post in posts"
        :key="post.nft.address"
        :post="post"
        mine
        @update="updatePost(post.nft.address)"
      />
      <button v-if="hasMore" class="text-white bg-pink-500 rounded p-2 w-full" @click="loadMore">Load more</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NftPost from '~/components/posts/NftPost.vue';
import { useAccountStore, useNotificationStore } from '~/store';
import type { PostUserSettingsRequestDTO, UserPostResponseDTO } from '~/types/dtos';

const posts = ref<UserPostResponseDTO[]>([]);
const accountStore = useAccountStore();
const notificationStore = useNotificationStore();
const pageSize = 20;
const pageNumber = ref(1);
const hasMore = ref(false);

onMounted(async () => {
  if (!accountStore.accessToken) {
    return;
  }

  const params = new URLSearchParams({
    pageNumber: String(pageNumber.value),
    pageSize: String(pageSize),
  });

  const _posts = await $fetch<UserPostResponseDTO[]>('/api/posts/my?' + params.toString(), {
    headers: {
      Authorization: `Bearer ${accountStore.accessToken}`,
    },
  });
  posts.value = _posts;
  hasMore.value = _posts.length === pageSize;
});

const updatePost = async (address: string) => {
  const index = posts.value.findIndex((p) => p.nft.address === address);
  if (index === -1) {
    return;
  }
  if (!accountStore.accessToken) {
    return;
  }

  const post = await $fetch<UserPostResponseDTO>(`/api/posts/${address}/settings`, {
    method: 'PUT',
    body: JSON.stringify({
      isVisible: !posts.value[index].isVisible,
    } as PostUserSettingsRequestDTO),
    headers: {
      Authorization: `Bearer ${accountStore.accessToken}`,
    },
  });

  notificationStore.addNotification('Post', post.isVisible ? 'Post is now visible' : 'Post is now hidden', 'success');
  posts.value[index] = post;
};

const error = ref<Error | null>(null);

const userProfile = ref({
  username: '',
  address: '',
  profilePicture: '',
  followerCount: 0,
  followingCount: 0,
  isOwnProfile: false,
});

const fetchUserProfile = async () => {
  try {
    const data = await $fetch(`/api/user/${accountStore.address}`, {
      headers: {
        Authorization: `Bearer ${accountStore.accessToken}`,
      },
    });

    userProfile.value = {
      ...data,
      username: data.username || 'Anonymous',
      profilePicture: data.profilePicture || '',
      isOwnProfile: true,
      followerCount: data.followerCount || 0,
      followingCount: data.followingCount || 0,
    };
  } catch (e) {
    error.value = e as Error;
  }
};

const loadMore = async () => {
  pageNumber.value += 1;
  const params = new URLSearchParams({
    pageNumber: String(pageNumber.value),
    pageSize: String(pageSize),
  });

  const _posts = await $fetch<UserPostResponseDTO[]>('/api/posts/my?' + params.toString(), {
    headers: {
      Authorization: `Bearer ${accountStore.accessToken}`,
    },
  });
  posts.value = [...posts.value, ..._posts];
  hasMore.value = _posts.length === pageSize;
};

onMounted(fetchUserProfile);
</script>

<style scoped>
.profile-container {
  @apply max-w-5xl mx-auto p-5 shadow-lg rounded-lg bg-[#1e293b];
}

.user-details {
  @apply flex items-center bg-[#1e293b] rounded-lg p-5;
}

.profile-picture {
  @apply w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg;
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
  @apply flex gap-5 mt-2.5 justify-end;
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
