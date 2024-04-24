<template>
  <div class="w-full absolute flex justify-center items-center p-4 space-x-3 text-white">
    <div class="h-6">
      <NuxtLink to="https://github.com/fiit-tp7-2023" target="_blank" class="transition-all hover:text-[#fe0854]">
        <Icon size="1.5em" name="mdi:github" class="!align-top" />
        GitHub
      </NuxtLink>
    </div>
    <div class="h-6">•</div>
    <div class="h-6">ChainMates</div>
    <div class="h-6">•</div>
    <div class="h-6">
      <NuxtLink to="https://www.fiit.stuba.sk" target="_blank" class="transition-all hover:text-[#fe0854]"
        >FIIT STU</NuxtLink
      >
    </div>
    <div class="h-6">•</div>
    <div class="h-6">{{ new Date().getFullYear() }}</div>
  </div>
</template>
