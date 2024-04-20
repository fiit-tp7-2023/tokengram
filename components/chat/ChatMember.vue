<template>
  <div class="flex items-center w-full gap-2">
    <img :src="profilePicture" alt="avatar" class="w-8 h-8 rounded-full" />
    <p class="overflow-hidden text-ellipsis cursor-pointer" @click="$emit('copy')">
      {{ member.username ?? member.address }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { UserResponseDTO } from '~/types/dtos';

defineEmits(['copy']);

const props = defineProps({
  member: {
    type: Object as PropType<UserResponseDTO>,
    required: true,
  },
});

const profilePicture =
  props.member.profilePicture ?? `https://gravatar.com/avatar/${props.member.address}?s=200&d=identicon&r=x`;
</script>
