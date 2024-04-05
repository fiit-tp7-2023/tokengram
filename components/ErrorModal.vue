<template>
  <!--Error modal-->
  <div class="absolute top-0 left-0 z-40 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white w-96 h-min-96 rounded-lg p-4 flex flex-col gap-4">
      <h2 class="text-2xl font-bold text-slate-800">Error</h2>
      <p class="text-lg text-slate-800">An error occurred while processing your request.</p>
      <p class="text-lg text-slate-800">{{ error.message }}</p>
      <button class="bg-slate-800 text-slate-200 px-4 py-2 rounded-lg" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  error: {
    type: Object as PropType<Error>,
    required: true,
  },
});

defineEmits(['close']);
</script>

<style></style>
