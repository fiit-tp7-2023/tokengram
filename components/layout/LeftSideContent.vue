<template>
  <div class="h-full border-r my-2 border-gray-400 p-2">
    <ul class="flex flex-col left-nav items-center md:items-start">
      <li v-for="link in links" :key="link.link" class="w-full">
        <NuxtLink :to="link.link">
          <span class="flex gap-1 px-2 text-xl items-center justify-start w-full h-10">
            <icon size="24" :name="link.icon" />
            <span class="label">{{ link.name }}</span>
          </span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useAccountStore } from '~/store';

interface Link {
  icon: string;
  name: string;
  link: string;
}

const accountStore = useAccountStore();

const links = computed<Link[]>(() =>
  accountStore.isLogged
    ? [
        {
          name: 'Home',
          link: '/',
          icon: 'mdi:home-outline',
        },
        {
          name: 'Chats',
          link: '/chat',
          icon: 'mdi:group',
        },
        {
          name: 'Signing test',
          link: '/sign',
          icon: 'mdi:graph-line',
        },
        {
          name: 'Settings',
          link: '/profile/settings',
          icon: 'mdi:cog-outline',
        },
      ]
    : [
        {
          name: 'Home',
          link: '/',
          icon: 'mdi:home-outline',
        },
      ],
);
</script>
<style>
.left-nav {
  a {
    @apply flex justify-end md:justify-center items-center gap-1;
    .label {
      @apply hidden md:block;
    }
  }
  li:not(:has(> .router-link-active)) {
    @apply text-gray-600;
  }
}
</style>
