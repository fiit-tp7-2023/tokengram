<template>
  <div>
    <UserSettingsComponent :access-token="accessToken" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import UserSettingsComponent from '~/components/user/UserSettingsComponent.vue';

const accessToken = ref<string | null>(null);
</script>

<style></style>
