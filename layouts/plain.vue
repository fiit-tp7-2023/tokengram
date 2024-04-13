<template>
  <div class="h-screen">
    <header><navigation-component /></header>
    <main content-class="content-style">
      <div class="w-full h-full px-4">
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
