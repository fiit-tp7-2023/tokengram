<template>
  <aside class="left-nav" :class="[expanded ? 'left-nav-expanded' : 'left-nav-collapsed']">
    <ul id="navigation-links" :class="{ 'items-start': expanded, 'items-center': !expanded }">
      <li class="nav-item cursor-pointer" title="Toggle menu" @click="expanded = !expanded">
        <icon size="24" name="mdi:menu" />
        <span v-if="expanded" class="label">Toggle menu</span>
      </li>
      <li v-for="link in links" :key="link.link">
        <NuxtLink :to="link.link" class="nav-item" :title="link.name">
          <icon size="24" :name="link.icon" />
          <span v-if="expanded" class="label">{{ link.name }}</span>
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { useAccountStore } from '~/store';

interface Link {
  icon: string;
  name: string;
  link: string;
}

const expanded = ref(true);

const accountStore = useAccountStore();

const links = computed<Link[]>(() =>
  accountStore.isLogged
    ? [
        {
          name: 'Home',
          link: '/home',
          icon: 'mdi:home-outline',
        },
        {
          name: 'Profile',
          link: '/profile',
          icon: 'mdi:account-outline',
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
  @apply flex flex-col w-full p-2 items-start bg-slate-900;

  #navigation-links {
    @apply w-full flex flex-col  gap-4 p-2;
  }

  .nav-item {
    @apply flex justify-start items-center gap-2 hover:text-pink-300;
    .label {
      @apply hover:text-pink-300 text-nowrap overflow-ellipsis;
    }
  }

  li:has(> .router-link-active) .nav-item {
    @apply text-pink-500;
    .label {
      @apply text-pink-500;
    }
  }

  &.left-nav-expanded {
    @apply max-w-[240px];
  }

  &.left-nav-collapsed {
    @apply w-[64px];
  }
}
</style>
