<template>
  <div class="h-full border-l my-2 border-gray-400 p-2 flex flex-col gap-2">
    <h3 class="text-xl text-gray-600">Recommended</h3>
    <hr />
    <ul class="flex flex-col gap-1">
      <li v-for="profile of profiles" :key="profile" class="underline">{{ profile }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const profiles: string[] = ['0x1312f31ef12ef12e', '0x3212f31ef12ef12e', '0x2312f31ef12ef12e'];
</script>
