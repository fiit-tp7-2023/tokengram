<template>
  <div class="h-screen bg-black">
    <header><navigation-component no-search /></header>
    <main class="flex h-full">
      <div class="w-full h-full">
        <slot />
      </div>
    </main>
    <footer>
      <footer-component />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import NavigationComponent from '~/components/layout/NavigationComponent.vue';
import FooterComponent from '~/components/layout/FooterComponent.vue';
</script>
