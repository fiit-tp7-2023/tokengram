<template>
  <div class="wrapper">
    <Icon
      name="mdi:search"
      :class="{
        'text-gray-200 cursor-not-allowed': !validAddress,
        'text-pink-300 hover:text-pink-500 cursor-pointer': validAddress,
      }"
      size="24"
      @click="go"
    />
    <input v-model="text" class="address-input" placeholder="Search" type="text" @keyup.enter="go" />
  </div>
</template>
<script setup lang="ts">
const text = ref('');
const router = useRouter();

const validAddress = computed(() => text.value.match(/(\b0x[a-fA-F0-9]{40}\b)/g));

const go = () => {
  if (!validAddress.value) return;
  router.push(`/profile/${text.value}`);
};
</script>
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
