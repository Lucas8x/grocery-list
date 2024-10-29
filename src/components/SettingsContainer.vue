<script setup lang="ts">
import { IconSettings } from '@tabler/icons-vue'
</script>

<template>
  <div
    class="flex w-full items-center justify-evenly bg-white px-2 py-1 rounded-md"
  >
    <button
      class="flex items-center gap-2 text-neutral-600"
      @click="() => {}"
    >
      <IconSettings
        size="28"
        class="text-neutral-600"
      />
      <span class="font-semibold">Configurações</span>
    </button>
  </div>
</template>
