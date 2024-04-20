<template>
  <div>
    <h1>User profile</h1>
    <h2>{{ address }}</h2>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const route = useRoute();
const address = computed(() => route.params.address);
</script>

<style></style>
