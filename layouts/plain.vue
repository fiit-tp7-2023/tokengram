<template>
  <n-layout class="h-screen">
    <n-layout class="h-screen">
      <n-layout-header> <navigation-component /> </n-layout-header>
      <n-layout-content content-class="content-style">
        <div class="w-full h-full px-4">
          <slot />
        </div>
      </n-layout-content>
      <n-layout-footer>
        <footer-component />
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import NavigationComponent from '~/components/layout/NavigationComponent.vue';
import FooterComponent from '~/components/layout/FooterComponent.vue';
</script>

<style scoped>
.n-layout-header,
.n-layout-content,
.n-layout-footer {
  padding: 0;
  background-color: inherit;
}

:deep(.content-style) {
  min-height: calc(100vh - 120px);
}
</style>
