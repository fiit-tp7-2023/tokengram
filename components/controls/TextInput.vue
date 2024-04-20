<template>
  <label v-if="label" class="underline font-bold" for="message">{{ label }}</label>
  <input
    v-model="model"
    :readonly="readonly"
    class="border-2 rounded-md p-2 bg-transparent"
    type="text"
    name="message"
    :placeholder="placeholder ?? undefined"
  />
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String as PropType<string | null>,
    default: null,
  },
  placeholder: {
    type: String as PropType<string | null>,
    default: null,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const model = defineModel<string | null>({
  required: true,
});
</script>

<style></style>
