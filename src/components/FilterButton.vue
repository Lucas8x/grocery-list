<script setup lang="ts">
defineProps<{
  name: string
  active: boolean
}>()

const emit = defineEmits(['click'])
</script>

<template>
  <button
    class="py-2 font-bold"
    :class="{
      'text-emerald-500 underline underline-offset-2 decoration-2': active,
      'text-neutral-700': !active
    }"
    @click="emit('click')"
  >
    {{ name }}
  </button>
</template>
