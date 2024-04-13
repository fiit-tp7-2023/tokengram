<template>
  <div class="wrapper">
    <Icon name="mdi:search" size="24" />
    <input class="address-input" placeholder="Search" type="text" />
  </div>
</template>
<style scoped>
.wrapper {
  @apply flex items-center gap-2 relative justify-center w-full px-2 h-10 border-2 border-pink-300 rounded-md bg-transparent text-pink-300;

  &:focus-within {
    @apply border-pink-500 text-pink-500;
  }
}
.address-input {
  @apply bg-transparent outline-none w-full h-full text-white placeholder:text-pink-100;

  &:focus {
    @apply placeholder:invisible;
  }
}
</style>
