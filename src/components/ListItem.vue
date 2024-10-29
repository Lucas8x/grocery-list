<script setup lang="ts">
import {
  IconX,
  IconCircleDashed,
  IconCircleDashedCheck,
  IconPhotoOff
} from '@tabler/icons-vue'

defineProps<{
  name: string
  checked: boolean
  imgSrc?: string
}>()

const emit = defineEmits(['check', 'remove'])
</script>

<template>
  <li class="flex w-full gap-2 justify-between px-4 py-4 odd:bg-neutral-50">
    <div class="flex gap-2 items-center text-wrap">
      <button
        class="active:scale-95"
        @click="emit('check')"
      >
        <IconCircleDashed
          size="28"
          v-if="!checked"
        />
        <IconCircleDashedCheck
          v-else
          size="28"
          class="text-neutral-500"
        />
      </button>

      <div
        class="size-10 aspect-square rounded-md bg-neutral-200 flex items-center justify-center"
      >
        <img
          class="rounded-md"
          :class="{ 'opacity-50': checked }"
          :src="imgSrc"
          :title="name"
          alt=""
          v-if="imgSrc"
        />

        <IconPhotoOff
          v-else
          :class="{ 'text-neutral-800': !checked, 'text-neutral-500': checked }"
        />
      </div>

      <span
        class="capitalize font-medium break-all"
        :class="{ 'line-through text-neutral-500': checked }"
      >
        {{ name }}
      </span>
    </div>

    <button
      class="hover:text-red-500"
      @click="emit('remove')"
    >
      <IconX size="22" />
    </button>
  </li>
</template>
