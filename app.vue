<template>
  <naive-config :theme-config="themeConfig">
    <n-message-provider>
      <n-layout>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </n-layout>
    </n-message-provider>
  </naive-config>
</template>
<script setup lang="ts">
import type { ThemeConfig } from '@bg-dev/nuxt-naiveui';

const themeConfig: ThemeConfig = {};
</script>
