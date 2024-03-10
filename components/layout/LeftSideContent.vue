<template>
  <div class="h-full border-r my-2 border-gray-400 p-2">
    <ul class="flex flex-col gap-2 left-nav items-center md:items-start">
      <li class="flex gap-1 text-xl items-center">
        <NuxtLink to="/">
          <icon size="24" name="mdi:home-outline" />
          <span class="label">Home</span>
        </NuxtLink>
      </li>
      <li class="flex gap-1 text-xl items-center">
        <NuxtLink to="/sign">
          <icon size="24" name="mdi:graph-line" />
          <span class="label">Signing test</span>
        </NuxtLink>
      </li>
      <li class="flex gap-1 text-xl items-center">
        <NuxtLink to="/settings">
          <icon size="24" name="mdi:cog-outline" />
          <span class="label">Settings</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup></script>
<style>
.left-nav {
  a {
    @apply flex justify-center items-center gap-1;
    .label {
      @apply hidden md:block;
    }
  }
  li:not(:has(> .router-link-active)) {
    @apply text-gray-600;
  }
}
</style>
