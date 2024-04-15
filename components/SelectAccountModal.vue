<template>
  <!--Create new chat modal, where you can invite friends-->
  <div class="absolute top-0 left-0 z-40 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-black border border-pink-500 w-96 h-min-96 rounded-lg p-4 flex flex-col gap-4">
      <h1 class="text-2xl text-center">Select account</h1>
      <ul class="flex flex-col gap-2 mb-2">
        <li v-for="account in accounts" :key="account" class="w-full flex justify-between">
          <button
            class="border border-slate-300 hover:border-pink-300 rounded py-2 px-2 w-full self-center overflow-hidden"
            :class="
              selectedAccount === account
                ? 'bg-pink-500 hover:bg-pink-400 text-black'
                : 'bg-slate-100 text-gray-400 cursor-not-allowed'
            "
            @click="selectAccount(account)"
          >
            {{ account }}
          </button>
        </li>
      </ul>

      <button class="rounded py-2 px-2 w-full border bg-pink-500 hover:bg-pink-400 text-black" @click="save">
        Confirm
      </button>
      <button class="border rounded py-2 px-2 w-full" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  accounts: {
    type: Array as PropType<string[]>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'select', account: string): void;
}>();

const selectedAccount = ref<string>('');

const selectAccount = (account: string) => {
  selectedAccount.value = account;
};

const save = () => {
  emit('select', selectedAccount.value);
};
</script>

<style></style>
