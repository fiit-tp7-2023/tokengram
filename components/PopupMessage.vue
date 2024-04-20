<template>
  <div
    class="bg-slate-800 border border-white rounded-lg shadow-lg p-4 flex flex-col items-start gap-2"
    :class="`bg-${type}-100 border-${type}-200`"
  >
    <p :class="[color]">{{ title }}</p>
    <span class="flex justify-between gap-2">
      <div class="flex items-center gap-2">
        <Icon :name="icon" :class="[color]" />
        <span>{{ message }}</span>
      </div>
      <button class="text-gray-500 hover:text-gray-800" @click="$emit('close')">
        <Icon name="mdi:close" />
      </button>
    </span>
  </div>
</template>

<script lang="ts" setup>
defineEmits(['close']);
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const icon = computed(() => {
  switch (props.type) {
    case 'success':
      return 'mdi:check-circle';
    case 'error':
      return 'mdi:alert-circle';
    case 'warning':
      return 'mdi:alert-circle';
    case 'info':
      return 'mdi:information';
  }
  return 'mdi:alert-circle';
});

const color = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-pink-500';
    case 'error':
      return 'text-red-500';
    case 'warning':
      return 'text-yellow-500';
    case 'info':
      return 'text-white';
  }
  return 'text-white';
});
</script>
