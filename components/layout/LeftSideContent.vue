<template>
  <aside class="left-nav" :class="[expanded ? 'left-nav-expanded' : 'left-nav-collapsed']">
    <ul id="navigation-links" :class="{ 'items-start': expanded, 'items-center': !expanded }">
      <li class="nav-item" @click="expanded = !expanded">
        <icon size="24" name="mdi:arrow-collapse-right" :class="[!expanded ? 'rotate-0' : 'rotate-180']" />
        <span v-if="expanded" class="label">Collapse menu</span>
      </li>
      <li v-for="link in links" :key="link.link">
        <NuxtLink :to="link.link" class="nav-item">
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

const expanded = ref(false);

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
          icon: 'mdi:message-outline',
        },
        {
          name: 'Signing test',
          link: '/sign',
          icon: 'mdi:file-sign',
        },
        {
          name: 'Settings',
          link: '/settings',
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
  @apply flex flex-col w-full p-2 h-full items-start bg-slate-900;

  #navigation-links {
    @apply w-full flex flex-col  gap-4 p-2;
  }

  .nav-item {
    @apply flex justify-start items-center gap-2 text-white;
  }

  li:has(> .router-link-active) .nav-item {
    @apply text-pink-200;
  }

  &.left-nav-expanded {
    @apply w-60;
  }

  &.left-nav-collapsed {
    @apply w-16;
  }
}
</style>
