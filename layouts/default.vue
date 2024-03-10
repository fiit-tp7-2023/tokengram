<template>
  <n-layout class="h-screen">
    <n-layout-header>
      <NavigationComponent />
    </n-layout-header>
    <n-layout-content>
      <div class="grid grid-cols-8 md:grid-cols-5 gap-x-4">
        <LeftSideContent />
        <div class="col-span-6 md:col-span-3">
          <slot />
        </div>
        <RightSideContent />
      </div>
    </n-layout-content>
    <n-layout-footer>
      <footer-component />
    </n-layout-footer>
  </n-layout>
</template>

<script lang="ts" setup>
import NavigationComponent from '~/components/layout/NavigationComponent.vue';
import FooterComponent from '~/components/layout/FooterComponent.vue';
import LeftSideContent from '~/components/layout/LeftSideContent.vue';
import RightSideContent from '~/components/layout/RightSideContent.vue';
</script>

<style scoped>
.n-layout-header,
.n-layout-content,
.n-layout-footer {
  padding: 0;
  background-color: inherit;
}

.n-layout-content {
  min-height: calc(100vh - 220px);
}
</style>
