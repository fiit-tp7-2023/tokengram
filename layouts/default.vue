<template>
  <div class="h-screen">
    <header><navigation-component /></header>
    <main class="flex h-full">
      <left-side-content />
      <div class="w-full h-full p-4">
        <slot />
      </div>
      <right-side-content />
    </main>
    <footer>
      <footer-component />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import NavigationComponent from '~/components/layout/NavigationComponent.vue';
import FooterComponent from '~/components/layout/FooterComponent.vue';
import LeftSideContent from '~/components/layout/LeftSideContent.vue';
import RightSideContent from '~/components/layout/RightSideContent.vue';
</script>
