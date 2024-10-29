<script setup lang="ts">
import { IconPlus } from '@tabler/icons-vue'

const emit = defineEmits(['click'])
</script>

<template>
  <button
    class="absolute size-14 flex items-center justify-center right-4 bottom-4 bg-green-500 rounded-full"
    @click="emit('click')"
  >
    <IconPlus
      size="32"
      class="text-white"
    />
  </button>
</template>
