<template>
  <div v-if="userProfile" class="profile-container">
    <h1 class="text-2xl font-mono text-pink-500">{{ userProfile.username }}</h1>
    <div class="user-details mt-4 bg-slate-900 text-white p-6 rounded-lg flex">
      <img
        v-if="userProfile.profilePicture"
        :src="userProfile.profilePicture"
        alt="Profile Picture"
        class="profile-picture shadow-lg text-center"
      />
      <span v-else class="profile-picture shadow-lg flex justify-center items-center">No image</span>
      <div class="info ml-6">
        <h2 class="text-xl font-mono">{{ userProfile.address }}</h2>
        <div class="follow-info mt-4">
          <h3 @click="toggleFollowersModal">Followers: {{ userProfile.followerCount }}</h3>
          <h3 @click="toggleFollowingModal">Following: {{ userProfile.followingCount }}</h3>
        </div>
      </div>
    </div>
    <hr class="mt-6 border-t border-gray-500" />
    <div class="w-full flex flex-col gap-2 mt-2">
      <nft-post
        v-for="post in posts"
        :key="post.nft.address"
        :post="post"
        editable
        @update="updatePost(post.nft.address)"
        @like="likePost(post.nft.address)"
        @unlike="unlikePost(post.nft.address)"
      />
      <button v-if="hasMore" class="text-white bg-pink-500 rounded p-2 w-full" @click="loadMore">Load more</button>
    </div>
    <div v-if="showFollowersModal" class="modal">
      <div v-if="showFollowersModal && userProfile.followerCount > 0" class="modal">
        <div class="modal-content">
          <span class="close" @click="showFollowersModal = false">&times;</span>
          <h1 class="p-2">Followers</h1>
          <h1>test</h1>
          <ul>
            <li v-for="follower in userFollowers" :key="follower.follower.address">
              <hr />
              <div class="flex">
                <div class="follower-avatar-container p-2">
                  <img
                    v-if="follower.follower.profilePicture"
                    :src="follower.follower.profilePicture"
                    alt="Profile Picture"
                    class="follower-avatar"
                  />
                  <span v-else class="follower-avatar placeholder"></span>
                </div>
                <div class="follower-info">
                  <a :href="`/profile/${follower.follower.address}`" class="follower-link">
                    <p>{{ follower.follower.address }}</p>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-else-if="showFollowersModal && userProfile.followerCount === 0" class="modal">
        <div class="modal-content">
          <span class="close" @click="showFollowersModal = false">&times;</span>
          <h1 class="p-2">Followers</h1>
          <p class="p-2">No followers found.</p>
        </div>
      </div>
    </div>
    <div v-if="showFollowingModal" class="modal">
      <div v-if="showFollowingModal && userProfile.followingCount > 0" class="modal">
        <div class="modal-content">
          <span class="close" @click="showFollowingModal = false">&times;</span>
          <h1 class="p-2">Following</h1>
          <ul>
            <li v-for="following in userFollowing" :key="following.followedUser.address">
              <hr />
              <div class="flex">
                <div class="follower-avatar-container p-2">
                  <img
                    v-if="following.followedUser.profilePicture"
                    :src="following.followedUser.profilePicture"
                    alt="Profile Picture"
                    class="follower-avatar"
                  />
                  <span v-else class="follower-avatar placeholder"></span>
                </div>
                <div class="follower-info">
                  <a :href="`/profile/${following.followedUser.address}`" class="follower-link">
                    <p>{{ following.followedUser.address }}</p>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-else-if="showFollowingModal && userProfile.followingCount === 0" class="modal">
        <div class="modal-content">
          <span class="close" @click="showFollowingModal = false">&times;</span>
          <h1 class="p-2">Following</h1>
          <p class="p-2">No profiles followed.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NftPost from '~/components/posts/NftPost.vue';
import { useAccountStore, useNotificationStore } from '~/store';
import type {
  UserFollowersDTO,
  UserFollowingDTO,
  PostUserSettingsRequestDTO,
  UserPostResponseDTO,
  UserProfileDTO,
} from '~/types/dtos';

const posts = ref<UserPostResponseDTO[]>([]);
const accountStore = useAccountStore();
const notificationStore = useNotificationStore();
const pageSize = 20;
const pageNumber = ref(1);
const hasMore = ref(false);
const userFollowers = ref<UserFollowersDTO | null>(null);
const userFollowing = ref<UserFollowingDTO | null>(null);

const showFollowersModal = ref(false);
const showFollowingModal = ref(false);

const toggleFollowersModal = async () => {
  showFollowersModal.value = !showFollowersModal.value;
  if (showFollowersModal.value) {
    await getFollowers();
  }
};

const toggleFollowingModal = async () => {
  showFollowingModal.value = !showFollowingModal.value;
  if (showFollowingModal.value) {
    await getFollowing();
  }
};

const getFollowers = async () => {
  const data = await $fetch(`/api/user/${accountStore.address}/followers`, {
    headers: {
      Authorization: `Bearer ${accountStore.accessToken}`,
    },
  });
  userFollowers.value = data;
  fetchUserProfile();
};

const getFollowing = async () => {
  const data = await $fetch(`/api/user/${accountStore.address}/following`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accountStore.accessToken}`,
    },
  });
  userFollowing.value = data;
  fetchUserProfile();
};

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

const userProfile = ref<UserProfileDTO | null>(null);

const fetchUserProfile = async () => {
  try {
    const data = await $fetch<UserProfileDTO>(`/api/user/${accountStore.address}`, {
      headers: {
        Authorization: `Bearer ${accountStore.accessToken}`,
      },
    });

    userProfile.value = data;
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

const likePost = (postId: string) => {
  const index = posts.value.findIndex((p) => p.nft.address === postId);
  if (index === -1) {
    return;
  }
  posts.value[index].likeCount += 1;
  posts.value[index].isLiked = true;
};

const unlikePost = (postId: string) => {
  const index = posts.value.findIndex((p) => p.nft.address === postId);
  if (index === -1) {
    return;
  }
  posts.value[index].likeCount -= 1;
  posts.value[index].isLiked = false;
};
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
.modal {
  @apply fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex items-start p-48 justify-center;
}

.modal-content {
  @apply bg-[#1e293b] p-5 rounded w-11/12 max-w-5xl relative;
}

.close {
  @apply absolute top-2 right-2 text-xl cursor-pointer;
}

.follower-item {
  @apply flex items-center mt-2;
}

.follower-info {
  @apply flex flex-col;
}

.follower-avatar-container {
  @apply flex-shrink-0; /* Prevents the avatar container from shrinking */
}

.follower-avatar,
.follower-avatar.placeholder {
  @apply w-8 h-8 rounded-full bg-gray-300; /* Sets the width and height, and background color for placeholder */
  display: inline-block; /* Ensures that the img element behaves like a block element filling the container */
}

.follower-avatar img {
  @apply w-full h-full object-cover; /* Ensures the image covers the entire area of the avatar */
}

.follower-link {
  @apply text-white no-underline hover:underline py-3;
}
</style>
