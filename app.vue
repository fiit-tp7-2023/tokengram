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

const themeConfig: ThemeConfig = {
  shared: {
    common: {
      baseColor: 'rgb(244,244,249)',
      bodyColor: 'rgb(244,244,249)',
      inputColor: '#fff',
      textColor1: '#000',
      textColor2: '#000',
      textColor3: '#000',
    },
  },
};
</script>
